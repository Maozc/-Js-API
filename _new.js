/* 
    1.创建一个新对象
    2.将该对象的__proto__属性指向构造函数的原型，即：newF.__proto__ = Fn.prototype
    3.将执行上下文(this)绑定到这个新创建的对象上
    4.如果构造函数有返回值，且为引用类型，将这个引用类型返回；否则返回新创建的对象
*/
function _new() {
    // 取到arguments中的第一个参数，即为构造函数，剩余的为其他参数
    let Fn = [].shift.call(arguments);
    let res = {}    // 返回的结果
    res.__proto__ = Fn.prototype;
    /*  或
        if (Fn.prototype !== null) {
            Object.setPrototypeOf(res, Fn.prototype);
        } */
    // 绑定this值，并判断构造函数的返回值
    let returnCon = Fn.apply(res, arguments);
    return returnCon instanceof Object ? r : res;
    // {} instanceof Object => true
    // fn instanceof Object => true
    // null instanceof Object => false
}

let Fn = function (a, b) {
    this.a = a;
    this.b = b;
}
Fn.prototype.sum = function () {
    console.log(this.a + this.b);
}

let f = _new(Fn, 12, 34)
f.sum()
