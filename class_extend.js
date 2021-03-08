class Child extends Parent {
    constructor(name, age) {
        super(name, age);
        this.name = name;
        this.age = age;
    }
    getName() {
        return this.name;
    }
}

class Parent {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
}

"use strict";

// 省略 _createClass
// 省略 _classCallCheck

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call
        && (typeof call === "object" || typeof call === "function") ? call : self;
    // 判断call是否为引用类型
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Child = function (_Parent) {
    _inherits(Child, _Parent);

    function Child(name, age) {
        _classCallCheck(this, Child);                // Child.__proto__ -> Parent
        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Child).call(this, name, age));

        _this.name = name;
        _this.age = age;
        return _this;
    }

    _createClass(Child, [{
        key: "getName",
        value: function getName() {
            return this.name;
        }
    }]);

    return Child;
}(Parent);

// 省略 Parent（类似上面的 Person 代码）

// 1.class Sub 基于 class Spuer,应该可以访问super实例的方法,以便sub实例可以做"一般"父类可以做的事
// 2.在父类方法的基础上进行调整或拓展其功能:super关键字
// 3.Sub还未有自己的constructor
//      继承类的 constructor 必须调用 super(...)，并且 (!) 一定要在使用 this 之前调用。
// 4.继承类(派生构造器)的构造函数 : 内部属性[[Constructor]]:"derived"会影响new的行为
//      + 当通过 new 执行一个常规函数时，它将创建一个空对象，并将这个空对象赋值给 this。
//      + 但是当继承的 constructor 执行时，它不会执行此操作。它期望父类的 constructor 来完成这项工作。
// 派生的 constructor 必须调用 super 才能执行其父类（base）的 constructor，
// 否则 this 指向的那个对象将不会被创建。并且我们会收到一个报错。

// [[HomeObject]]:当一个函数定义为类或者对象方法时,其[[HomeObject]]属性就成为了该对象,而后super使用它来解析父原型及其方法
// 且不能被更改,

// 静态属性和静态方法是可继承的,直接通过Sub.staticProp使用: Sub.__proto__ -> Super