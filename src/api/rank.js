import axios from 'axios'

export function getRank() {
    const url = '/api/getRank'

    const data = {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: +new Date()
    }

    return axios.get(url, {
        params: data
    }).then(res => {
        return Promise.resolve(res.data)
    })
}

export function getTopList(topId) {
    const url = '/api/getTopList'

    const data = {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top',
        topid: topId,
        _: +new Date()
    }

    return axios.get(url, {
        params: data
    }).then(res => {
        return Promise.resolve(res.data)
    })
}