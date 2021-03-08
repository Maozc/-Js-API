'use strict';   // 使用严格模式

class Person {
    static instance = null; // 静态属性: => Person.instance
    static getInstance() {  // 静态方法
        return super.instance;
    }

    constructor(name, age) {    // 构造函数
        this.name = name;   // 私有属性
        this.age = age;
    };
    /*  等价于
        name1 = 'mao'; 
        age1 = 23; */
    sayHi() {   // 类方法: Person.prototype.sayHi,不可枚举
        console.log(this);
        console.log('hi');
    }
    sayHello = () => {  // 箭头函数:this.sayHello:私有方法
        console.log(this);
        console.log('hello');
    }
    sayBye = function () {  // this.sayBye
        console.log('bye');
    }
}

let per = new Person();
let sayHI = per.sayHi;
sayHI();    // this -> undefined(严格模式) 函数中的this取决于调用上下文,
// 这里saiHi在别的地方调用,丧失了原有的上下文,就如同this中调用方法需要绑定this一样
let sayHello = per.sayHello;
sayHello(); // this显示正常:箭头没有this,其this向上层作用域中寻找,就指向了类实例本身

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Person = function () {
    function Person(name, age) {
        _classCallCheck(this, Person);

        this.sayHello = function () {
            console.log('hello');
        };

        this.sayBye = function () {
            console.log('bye');
        };

        this.name = name;
        this.age = age;
    }

    _createClass(Person, [{
        key: 'sayHi',
        value: function sayHi() {
            console.log('hi');
        }
    }]);

    return Person;
}();

Person.instance = null;