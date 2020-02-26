/**
 * Auth: PanShiCheng
 * Create Time: 2020-02-26
 * Description:
 */
import storage from 'good-storage'

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 15

// 本地存储
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 1) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}
// 单个删除本地存储
export function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveFavorite(sell) {
  const sells = storage.get(FAVORITE_KEY, [])
  insertArray(sells, sell, (item) => {
    return sell.name === item.name
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, sells)
  return sells
}

export function deleteFavorite(sell) {
  const sells = storage.get(FAVORITE_KEY, [])
  deleteFromArray(sells, (item) => {
    return sell.name === item.name
  })
  storage.set(FAVORITE_KEY, sells)
  return sells
}
// 加载
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
