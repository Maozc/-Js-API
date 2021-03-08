Array.prototype._reduce = function (callbackFn, initialValue) {
    // 类型异常处理
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'reduce' of null");
    }
    // 参数类型异常处理:须为Function
    if (typeof callbackFn !== 'function') {
        throw new TypeError(callbackFn + ' is not a function');
    }
    let O = Object(this);
    let len = O.length >>> 0; // 无符号右移0位,正数取整
    let k = 0;
    let accumulator = initialValue; // 累加器的初始值
    if (accumulator === undefined) {  // 初始值不传的处理
        for (; k < len; k++) {
            if (k in O) {
                accumulator = O[k];
                k++;
                break;
            }
            throw new Error('Each element of the array is empty');
        }
    }
    for (; k < len; k++) {
        if (k in O) {
            accumulator = callbackFn.call(undefined, accumulator, O[k], O);
        }
    }
    return accumulator;
}

let arr = [1, 2, 3, 4];
let a = arr._reduce((acc, k) => {
    return acc += k;
}, 0);
console.log(a);


/*  map方法的实现 */
Array.prototype._map = function (callbackFn, thisValue) {
    // 类型异常处理
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'reduce' of null");
    }
    // 参数类型异常处理:须为Function
    if (typeof callbackFn !== 'function') {
        throw new TypeError(callbackFn + ' is not a function');
    }
    let O = Object(this);
    thisValue = thisValue || [];
    let len = O.length >>> 0;
    let arr = new Array(len);
    for (let k = 0; k < len; k++) {
        if (k in O) {
            let kValue = O[k];
            let mapValue = callbackFn.call(thisValue, kValue, k, O);
            arr[k] = mapValue;
        }
    }
    return arr;
}

let arr = [1, 2, 3];
console.log(arr._map((item, index) => item * item));

/*  push方法的实现 */
Array.prototype._push = function (...item) {
    let O = Object(this);   // ecma中提到先转换为对象
    let len = O.length >>> 0;
    let argsCount = item.length >>> 0;
    if (len + argsCount > 2 ** 53 - 1) {
        throw new TypeError('The number of Array is over the max value');
    }
    for (let i = 0; i < argsCount; i++) {
        O[len + i] = item[i];
    }
    let newLength = len + argsCount;
    O.length = newLength;
    return newLength;
}
let arr = [1, 2, 3];
console.log(arr._push(4, 5, 6));
console.log(arr)

Array.prototype._pop = function () {
    let O = Object(this);   // ecma中提到先转换为对象
    let len = O.length >>> 0;
    if (len === 0) {
        O.length = 0;
        return undefined;
    }
    len--;
    let value = O[len];
    delete O[len];
    O.length = len; // 因为js数组.length可以用于删除元素,如length为3,则arr[3]是访问不到元素的,因此这里的顺序不能反
    return value;
}
let arr = [1, 2, 3];
console.log(arr._pop());
console.log(arr)

// flat扁平化方法: 拍扁几层 ; 原数组有空位,跳过空位
Array.prototype._flat = function (depth = 1) {
    // 找到数组中是数组类型的元素,将其展开
    // 1.遍历数组;2.判断数组;3.展开:拓展运算符+concat; concat+apply
    // 判断是数组的方法: arr instanceof Array ; arr.construcotr === Array ; 
    //                  Object.prototype.toString.call(arr)==='[object Array]' ; Array.isArray(arr)

    /* reduce实现 */
    // if (!Number(depth) || depth < 0)
    //     return this;
    // let arr = [...this];
    // return depth > 0
    //     ? this.reduce((acc, cur) => {
    //         return acc.concat(Array.isArray(cur) ? cur._flat(--depth) : cur)
    //     }, [])
    //     : arr.slice();

    /* 递归实现 */
    if (!Number(depth) || depth < 0)
        return this;
    const res = [];
    this.forEach(item => {
        if (Array.isArray(item)) {
            res.push(...item._flat(--depth))
        } else {
            res.push(item);
        }
    })
    return res;
}
const arr = [, [1, 2, 3, [4, 5, 6, [7, 8, 9]]], 10, "string", { name: "爬爬同学" }];
console.log(arr._flat(2));