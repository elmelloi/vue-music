<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    pullup: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 300
    },
    beforeScroll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    _initScroll() {
      // 为了防止组件没有初始化报错，先检查
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      });

      if (this.listenScroll) {
        // 保留vue实例的this，回调函数里的this指向scroll实例
        let me = this;
        // pos为插件提供的获取实时位置的对象
        this.scroll.on("scroll", pos => {
          me.$emit("currentScroll", pos);
        });
      }

      if (this.pullup) {
        // 触发上拉刷新
        this.scroll.on("scrollEnd", () => {
          // 上拉使scroll向下滚动，scroll.y减少
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            console.log("scrollToEnd");
            this.$emit("scrollToEnd");
          }
        });
      }

      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 100);
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    }
  }
};
</script>
