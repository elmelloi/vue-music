import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {

    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);

    return new Promise((reslove, reject) => {

        //这里的option指的是url中约定好的回调函数属性的名称，库会随机生成一个回调函数名，发出jsonp请求，返回给开发者json格式的数据
        originJSONP(url, option, (err, data) => {
            if (!err) {
                reslove(data);
            } else {
                reject(err);
            }
        })
    })
}


function param(data) {
    let url = '';
    for (let k in data) {
        let value = data[k] !== undefined ? data[k] : '';
        url += `&${k}=${encodeURIComponent(value)}`;
    }
    return url ? url.substring(1) : '';
}