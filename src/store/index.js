import Vue from 'vue';
import Vuex from 'vuex'
// 整体加载写法
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import { mutations } from './mutation'
import createLogger from 'vuex/dist/logger'


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})