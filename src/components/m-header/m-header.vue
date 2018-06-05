<template>
  <div class="m-header">
    <div class="icon"></div>
    <!-- <router-link> 组件支持用户在具有路由功能的应用中导航。通过to属性指定目标地址，默认渲染成带有正确链接的 <a> 标签，可以通过配置 tag 属性生成别的标签。 -->
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine" ></i>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.m-header {
  position: relative;
  height: 44px;
  text-align: center;
  color: $color-theme;
  font-size: 0;

  .icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
    width: 108px;
    height: 30px;
    margin-right: 9px;
    bg-image('logo');
    background-size: contain;
  }

  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: $font-size-large;
  }

  .mine {
    position: absolute;
    top: 0;
    right: 0;

    .icon-mine {
      display: block;
      padding: 12px;
      font-size: 20px;
      color: $color-theme;
    }
  }
}
</style>


