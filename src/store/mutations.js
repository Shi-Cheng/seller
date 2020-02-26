/**
 * Auth: PanShiCheng
 * Create Time: 2020-02-26
 * Description:
 */
import * as types from './mutations-type'
const mutations = {
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  }
}
export default mutations

