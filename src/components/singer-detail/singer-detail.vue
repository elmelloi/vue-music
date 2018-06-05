<template>
  <transition name="slider">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { getSingerDetail } from "api/singer";
import { ERR_OK } from "api/config";
import { createSong } from "common/js/song";
import MusicList from "components/music-list/music-list";

export default {
  data() {
    return {
      songs: []
    };
  },
  computed: {
    title() {
      return this.singer.name;
    },
    bgImage() {
      return this.singer.avatar;
    },
    // getter.js中的
    ...mapGetters(["singer"])
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      // 防止vuex还没有获取数据时页面被刷新
      if (!this.singer.id) {
        this.$router.push("/singer");
        return;
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        // 对象的解构赋值来获取list中每个对象中的musicData
        let { musicData } = item;
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  components: {
    MusicList
  }
};
</script>



<style lang="stylus" scoped>
@import '~common/stylus/variable';

// .singer-detail {
// position: fixed;
// z-index: 100;
// top: 0;
// left: 0;
// right: 0;
// bottom: 0;
// background: $color-background;
// }
.slider-enter-active, .slider-leave-active {
  transition: all 0.3s;
}

.slider-enter, .slider-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
