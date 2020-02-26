/**
 * Auth: PanShiCheng
 * Create Time: 2020-02-26
 * Description:
 */
import * as types from './mutations-type'
import { saveFavorite, deleteFavorite } from '../common/js/catch'

export const saveFavoriteList = function({ commit }, sell) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(sell))
}

export const deleteFavoriteList = function({ commit }, sell) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(sell))
}
