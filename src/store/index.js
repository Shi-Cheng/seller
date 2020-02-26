/**
 * Auth: PanShiCheng
 * Create Time: 2020-02-26
 * Description:
 */
import vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import createLogger from 'vuex/dist/logger'

const debug = process.env.NODE_ENV !== 'production'

vue.use(Vuex)

export default new Vuex.Store({
  mutations,
  state,
  actions,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
