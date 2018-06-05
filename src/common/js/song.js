// import {getLyric} from '../../api/lyric'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'
import { getVkey } from 'api/vkey'
import { getLyric } from 'api/lyric'

export default class Song {
    constructor({ id, mid, singer, name, album, duration, image, url }) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        if (url) {
            this.url = url
        }
    }

    getLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }
        return new Promise((resolve, reject) => {
            getLyric(this.mid).then(res => {
                let ret = res
                let reg = /^\w+\(({[^()]+})\)$/
                let matches = ret.match(reg)

                if (matches) {
                    //match[1]返回用圆括号捕获的结果
                    ret = JSON.parse(matches[1])
                    if (ret.code === ERR_OK) {
                        this.lyric = Base64.decode(ret.lyric)

                        resolve(this.lyric)
                    } else {
                        reject('no lyric')
                    }
                }
            })
        })
    }

    // _getUrl() {
    //     if (this.url) {
    //         return
    //     }
    //     getVkey(this.mid).then(vkey => {
    //         let url = `http://dl.stream.qqmusic.qq.com/C400${this.mid}.m4a?vkey=${vkey}&guid=7631401125&uin=1103052133&fromtag=66`
    //         this.url = url;
    //         console.log(hehe);
    //         return Promise.resolve(url);
    //     })
    // }
}

export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    })
}

export function filterSinger(singer) {
    let ret = []
    if (!singer) {
        return ''
    }
    // singer的数据结构是一个数组
    singer.forEach((s) => {
        ret.push(s.name)
    })
    return ret.join('/')
}