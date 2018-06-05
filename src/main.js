import "babel-polyfill";
import fastclick from "fastclick";
import Vue from "vue";
import App from "./App";
import store from './store'
import router from "./router";
import "./common/stylus/index.styl";
import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false;

fastclick.attach(document.body);

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: "#app",
  // 将 h 作为 createElement 的别名
  //virtul Dom 方案渲染模版
  render: h => h(App),
  store,
  router
});
