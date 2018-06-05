import axios from 'axios'


export function getVkey(songMid) {
    const url = `/api/getVkey`

    const data = Object.assign({}, {
        g_tk: 1586143899,
        loginUin: 1103052133,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        cid: 205361747,
        uin: 1103052133,
        songmid: songMid,
        filename: `C400${songMid}.m4a`,
        guid: 7631401125
    })

    return axios.get(url, {
        params: data
    }).then(res => {
        return Promise.resolve(res.data.data.items[0].vkey)
    })
}



