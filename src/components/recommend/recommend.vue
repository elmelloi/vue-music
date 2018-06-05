<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" :data="playList" ref="scroll">
      <!-- v-if是为了保证异步获取数据完成后才进行渲染 -->
      <!--  忘了用div包裹住slider和llist -->
      <div>
      <div v-if="recommends.length" class="slider-wrapper">
        <slider>
          <div class="href" v-for="item in recommends">
            <a :href="item.linkUrl">
              <img @load="loadImage" :src="item.picUrl" >
            </a>
          </div>
        </slider>
      </div>

      
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li  @click="selectItem(item)"  v-for="item in playList" class="item">
            <div class="icon">
              <img v-lazy ="item.imgurl" width="60" height="60">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
      </div>
      <div class="loading-container" v-show="!playList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>



<script type="text/javascript">
// ⁿ
// ▏n
// █▏　､⺍
// █▏
// ⺰ʷʷｨ
// █◣▄██◣
// ◥██████▋
// 　◥████ █▎
// 　　███▉
// █▎
// 　◢████◣⌠ₘ℩
// 　　██◥█◣*≫
// 　　██　◥█◣
// 　　█▉　　█▊
// 　　█▊　　█▊
// 　　█▊　　█▋
//
// █▏　　█▙
// 　　 █
// 止まるんじゃねぇぞ

import Loading from "base/loading/loading";
import Scroll from "base/scroll/scroll";
import { getRecommend, getPlayList } from "api/recommend";
import { ERR_OK } from "api/config";
import Slider from "base/slider/slider";
import { playlistMixin } from "common/js/mixin";
import { mapMutations } from "vuex";

export default {
  mixins: [playlistMixin],
  data() {
    return {
      recommends: [],
      playList: []
    };
  },
  created() {
    this._getRecommend();

    this._getPlayList();
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.recommend.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      });
      this.setDisc(item);
    },
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },
    _getPlayList() {
      getPlayList().then(res => {
        if (res.code === ERR_OK) {
          this.playList = res.data.list.slice(6);
        }
      });
    },
    // 增加了这个方法后还是滚动不到底部
    // 解决了，是因为我的屏幕不够大，看不到浏览器底部
    loadImage() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh();
        this.checkLoaded = true;
      }
    },
    ...mapMutations({
      setDisc: "SET_DISC"
    })
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
};
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>