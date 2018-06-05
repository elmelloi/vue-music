<template>
  <div class="progress-circle">
    <!-- viewbox的值与circle里的半径形成比例。使此组件能够适应任何半径  -->
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
     
      <!-- <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/> -->
      <!-- stroke-dashoffarray的数值表示先画长度为314的实现，stroke-dashoffset表示虚线开始的位置：本次图形起点是12点位置为0/314，按逆时针方向增长--> 
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray"
              :stroke-dashoffset="dashOffset"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    radius: {
      type: Number,
      default: 100
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dashArray: Math.PI * 100
    };
  },
  computed: {
    dashOffset() {
      return (1 - this.percent) * this.dashArray;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.progress-circle {
  position: relative;

  circle {
    stroke-width: 8px;
    transform-origin: center;

    &.progress-background {
      transform: scale(0.9);
      stroke: $color-theme-d;
    }

    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: $color-theme;
    }
  }
}
</style>