/**
 * Auth: PanShiCheng
 * Create Time: 2020-02-29
 * Description: 解析url
 * @example ?id=123&a=b
 * @return Object {id: 12345, a:b}
 */
export function urlParse() {
  // window的location对象
  const url = window.location.search
  const obj = {}
  const reg = /[?&][^?&]+=[^?&]+/g
  const arr = url.match(reg)
  // ['?id=123','&a=b']
  if (arr) {
    arr.forEach((item) => {
      const tempArr = item.substring(1).split('=')
      const key = decodeURIComponent(tempArr[0])
      const value = decodeURIComponent(tempArr[1])
      obj[key] = value
    })
  }
  return obj
}
