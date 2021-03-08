function ajax() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'https://www.baidu.com');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                let string = xhr.responseText;
                let object = JSON.parse(string);
            }
        }
    }
    xhr.send()
}

function ajaxPro(url) {
    const p = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'https://www.baidu.com');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject('请求出错')
                }
            }
        }
        xhr.send()
    })
    return p;
}

ajaxPro('https://www.baidu.com').then(res => console.log(res))
    .catch(msg => console.log(msg));