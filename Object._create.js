/* 
    1.创建一个空对象
    2.将空对象的原型:__proto__设置为protoObj
    3.将属性的propertiesObject赋给新建对象
    4.返回新对象
*/
Object._create = function (protoObj, propertiesObj = {}) {
    // 对proto的类型进行检测
    const protoType = typeof protoObj;
    if (protoType !== 'object' && protoType !== 'function' && protoObj !== 'null') {
        throw new Error('prototype type Error')
    }
    const res = {};
    Object.setPrototypeOf(res, protoObj);
    // 注意：这里的propertiesObj不能为null或undefined
    Object.defineProperties(res, propertiesObj);
    return res;
}

let obj = {
    a: 1
}

let o = Object._create(obj);
o.b = 2;
console.log(o, o.a);


