/* 
    作用:判断一个实例是否其父类或者祖先类的实例
        +原理:遍历原型链,知道找到右边变量的prototype,查找失败,返回false
*/
let _instanceof = (target, origin) => {
    while (target) {
        if (target.__proto__ === origin.prototype) {
            return true;
        }
        target = target.__proto__;
    }
    return false;
}

let a = [1, 2, 3]
console.log(_instanceof(a, Array));
console.log(_instanceof(a, Object));