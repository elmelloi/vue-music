import axios from 'axios'


export function getLyric(songmid) {
  const url = `/api/getLyric`

  const data = Object.assign({}, {
    pcachetime: +new Date(),
    songmid: songmid,
    g_tk: 67232076,
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0
  })


  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}