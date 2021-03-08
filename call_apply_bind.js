/* bind实现
    1.指定this
    2.传入参数，并实现柯里化
    3.返回一个函数

    bind返回的绑定函数也能使用 new 操作符创建对象：
    这种行为就像把原函数当成构造器，提供的 this 值被忽略，同时调用时的参数被提供给模拟函数
*/
Function.prototype._bind = function (context) {
    if (typeof this === 'function')
        throw new Error('只有函数调用_bind方法');

    let self = this;
    let args = Array.prototype.slice.call(arguments, 1);
    // 创建一个空对象
    let fNOP = function () { };

    let fBound = function () {
        // 解决函数参数柯里化
        let innerArgs = Array.prototype.slice.call(arguments);
        let finalArgs = args.concat(innerArgs);
        // 注释1
        return self.apply(this instanceof fNOP ? this : context, finalArgs)
    }
    // 空对象的原型指向绑定函数的原型
    fNOP.prototype = this.prototype;
    // fBound.prototype指向空对象的实例,以继承到绑定函数的原型上的值
    fBound.prototype = new fNOP();
    return fBound;
}

/* 注释1：
    + 当作为构造函数时，this 指向实例，此时 this instanceof fNOP 结果为 true ，可以让实例
      获得来自绑定函数的值，即上例中实例会具有 habit 属性。
    + 当作为普通函数时，this 指向 window ，此时结果为 false ，将绑定函数的 this 指向 context
*/

/* 手写call */
Function.prototype._call = function (context, ...args) {
    // 1.判定context对象
    /* 
        context = context || Object(context) : window
        或
        context = context ||  window
        不够严谨,因为 '' 0 false 在上述判定条件中,都会指向window,但其应该分别指向自己的包装对象
    */
    if (context === null || context === undefined) {
        // 为null或undefined时,this值指向全局对象
        context = global;
    } else {
        // 值为原始值时,指向值对应的包装对象
        context = Object(context)
    }
    const specialFn = Symbol('specialFn');
    context[specialFn] = this;  // 函数的this隐式绑定到context上
    let result = context[specialFn](...args);
    delete context[specialFn];  // 删除该特殊上下文属性
    return result;
}

/* 手写apply */
Function.prototype._call = function (context) {
    // 1.判定context对象
    if (context === null || context === undefined) {
        // 为null或undefined时,this值指向全局对象
        context = global;
    } else {
        // 值为原始值时,指向值对应的包装对象
        context = Object(context)
    }

    // 2.判断是否为类数组对象
    /* 不是null 和 undefined等, obj是对象
        o.length是有限数值
        o.length是非负值
        o.length是整数
        o.length的值小于 2^32
     */
    function isArrayLike(obj) {
        if (obj && typeof obj === 'object' && isFinite(obj.length) &&
            obj.length >= 0 && obj.length === Math.floor(obj.length) &&
            obj.length < Math.pow(2, 32)
        ) {
            return true
        } else {
            return false
        }
    }

    const specialFn = Symbol('specialFn');
    context[specialFn] = this;  // 函数的this隐式绑定到context上
    let result;
    // 2.处理参数
    let args = arguments[1];
    if (args) {   // 是否传入了参数
        if (!Array.isArray(args) && !isArrayLike(args)) {
            throw new TypeError('_apply第二个参数须为数组或类数组')
        } else {
            args = Array.from(args);
            result = context[specialFn](...args)
        }
    } else {
        result = context[specialFn]()
    }
    delete context[specialFn];
    return result;
}

// 测试
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

function foo() {
    console.log(this);
}

bar._call(null); // 2
foo._call(123); // Number {123, fn: ƒ}

bar._call(obj, 'kevin', 18);