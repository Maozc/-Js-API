const fs = require('mz/fs');

function co(it) {
    return new Promise((resolve, reject) => {
        function next(val) {
            let { value, done } = it.next(val);
            if (done) {
                return resolve(value);
            }
            Promise.resolve(value).then(data => {
                next(data);
            }, reject)
        }
        next();
    })
}

function* read() {
    // 需要配合 mz库才可实现不需要回调
    let name = yield fs.readFile('./name.txt', 'utf8');
    let content = yield fs.readFile(name, 'utf8');
    let txt = yield [content];
    return txt;
}

// 手动迭代版本
let it = read();
let { value, done } = it.next();
value.then(data => {
    let { value, done } = it.next(data);
    value.then(data => {
        let { value, done } = it.next(data);
        console.log(value);
    })
})

// 自动迭代版本
co(read()).then(data => {
    console.log(data);
}).catch(e => {
    console.log(e);
})
