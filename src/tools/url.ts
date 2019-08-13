import { isDate, isObject, encodeUrl } from './util'

export function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }
  let eachParams: string[] = []
  Object.keys(params).forEach(key => {
    let val = params[key]
    if (!val) {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += [key, '[]'].join('')
    } else {
      values = [val]
    }
    values.forEach((t, i) => {
      if (isDate(t)) {
        t = t.toISOString()
      } else if (isObject(val)) {
        t = JSON.stringify(t)
      }
      eachParams.push(`${encodeUrl(key)}=${encodeUrl(t)}`)
    })
  })
  let serializeParams = eachParams.join('&')
  if (url.indexOf('?') > 0) {
    return (url += '&' + serializeParams)
  }
  return url + '?' + serializeParams
}
