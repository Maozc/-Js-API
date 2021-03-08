/* 
    JSON.stringify(data[,replacer [,space]])
        将一个JS值,转为一个JSON字符串,原理为:不同值对应不同的转换规则
*/
function _JSONStringify(data) {
    let dataType = typeof data;
    if (dataType !== 'object') {    // 处理非对象
        let result = data;
        if (Number.isNaN(data) || data === Infinity) {    // Number类型中的特殊值
            result = "null";
        } else if (dataType === 'function' || dataType === 'undefined' || dataType === 'symbol') {
            // function undefined symbol
            return undefined;
        } else if (dataType === 'string') {
            result = `"${data}"`;
        }
        return String(result);
    } else if (dataType === 'object') { // 处理对象
        if (data === null) {
            return "null";
        } else if (data.toJSON && typeof data.toJSON === 'function') {
            return _JSONStringify(data.toJSON())
        } else if (data instanceof Array) {    // instanceof的作用是判断是不是实例
            // 数组里的每一项的类型可能是多样的
            let result = [];
            data.forEach((item, index) => {
                let dataType = typeof item;
                // 数组中下面这三项变为"null"字符串
                if (dataType === 'function' || dataType === 'undefined' || dataType === 'symbol') {
                    result[index] = "null";
                } else {
                    result[index] = _JSONStringify(item);
                }
            });
            result = `[${result}]`; // 字符串化数组: `[${[1,2,3]}]` => "[1,2,3]"
            return result.replace(/'/g, '"');
        } else {    // 处理普通对象
            let result = [];
            Object.keys(data).forEach((item, index) => {
                if (typeof item !== 'symbol') { // key键为symbol,忽略
                    let dataType = typeof data[item];
                    // value值 为undefined function symbol,忽略
                    if (dataType !== 'function' && dataType !== 'undefined' && dataType !== 'symbol') {
                        result.push(`"${item}":${_JSONStringify(data[item])}`)
                    }
                }
            });
            return (`{${result}}`).replace(/'/g, '"');  // `{${1,2,3}}` => "{1,2,3}"
        }
    }
}

let obj = {
    name: 'jack',
    age: 18,
    attr: ['coding', 123],
    date: new Date(),
    uni: Symbol(2),
    sayHi: function () {
        console.log("hi")
    },
    info: {
        sister: 'lily',
        age: 16,
        intro: {
            money: undefined,
            job: null
        }
    }
}
console.log(JSON.stringify(obj))
console.log(_JSONStringify(obj))
console.log(JSON.stringify(obj) === _JSONStringify(obj))
