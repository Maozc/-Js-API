Array.prototype._flat = function (depth = 1) {
    // 找到数组中是数组类型的元素,将其展开
    // 1.遍历数组;2.判断数组;3.展开:拓展运算符+concat; concat+apply

    /* reduce实现 */
    return depth > 0
        ? this.reduce((acc, cur) => {
            if (Array.isArray(cur)) {
                // console.log(this._flat.call(cur, depth - 1), "jjj");
                console.log(cur);
                let arr = this._flat.call(cur, depth - 1);
                console.log(arr, "hhh");
                return [...acc, arr]
            }
            return [...acc, cur];
        }, [])
        : arr

    /* 递归实现 */
    // const res = [];
    // this.forEach(item => {
    //     if (Array.isArray(item)) {
    //         res.push(...this._flat.call(item))
    //     } else {
    //         res.push(item);
    //     }
    // })
    // return res;
}
const arr = [0, [1, 2, 3, [4, 5, 6, [7, 8, 9]]], 10, "string", { name: "爬爬同学" }];
arr._flat(2);