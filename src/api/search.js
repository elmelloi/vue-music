import { commonParams, options } from './config'
import axios from 'axios'

export function getHotKey() {
  const url = '/api/getHotKey'

  const data = Object.assign({}, {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    _: +new Date()
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getSearch(query, page, zhida, perpage) {
  const url = `/api/getSearch`

  const data = Object.assign({}, {
    catZhida: zhida ? 1 : 0,
    p: page,
    w: query,
    perpage,
    n: perpage,
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    sem: 1,
    ie: 'utf-8',
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    _: +new Date()
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

