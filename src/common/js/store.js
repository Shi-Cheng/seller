/**
 * Auth: PanShiCheng
 * Create Time: 2020-02-29
 * Description: 本地存储
 */
export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.__seller__ = JSON.stringify(seller)
}

export function loadFormLocal(id, key, def) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    return
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  const ret = seller[key]
  return ret || def
}
