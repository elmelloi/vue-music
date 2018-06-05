import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getRecommend() {
    const url = '/api/getRecommend'

    const data = Object.assign({}, commonParams, {
        uin: 0,
        format: 'json',
        platform: 'h5',
        needNewCode: 1,
        _: 1522744403237
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

export function getPlayList() {
    // 此处如果不用webpack的proxyTable修改request请求的来源，会产生500错误
    const url = '/api/getPlayList'

    const data = Object.assign({}, commonParams, {
        picmid: 1,
        needNewCode: 0,
        categoryId: 10000000,
        format: 'json', // 因为使用axios,所以请求数据的应该是json
        sortId: 5,
        sin: 0,
        ein: 29,
        platform: 'yqq',
        hostUin: 0,
        loginUin: 0,
        rnd: Math.random()
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}


export function getSongList(disstid) {
    const url = `/api/getSongList`

    const data = Object.assign({}, {
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        disstid: disstid,
        format: 'json',
        g_tk: 999222372,
        loginUin: 0,
        hostUin: 0,
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
    })

    return axios.get(url, {
        params: data
    }).then(res => {
        return Promise.resolve(res.data)
    })
}