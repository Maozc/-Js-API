let jsonStr = '{ "name": "jack", "age": 18, "attr": ["coding", 123], "date": "2021-02-28T08:55:53.084Z", "info": { "sister": "lily", "age": 16, "intro": { "job": null } } }'
// function _JSONParse(jsonStr) {
//     return eval(`(${jsonStr})`)
// }

function _JSONParse(jsonStr) {
    return new Function('return' + jsonStr)()
}

console.log(_JSONParse(jsonStr))

