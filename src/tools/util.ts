import { XosRequestConfig, Method } from '../types'
import transform from '../core/transform'

const toStr = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toStr.call(val) === '[object Date]'
}

export function encodeUrl(uri: string): string {
  return encodeURIComponent(uri)
}

export function isPlainObject(data: any): data is Object {
  return toStr.call(data) === '[object Object]'
}

export function normalizeHeaders(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function transformSendData(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaders(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    } else if (!headers) {
      headers = Object.create(null)
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function transResponseHeaderToJSON(header: string): any {
  let parsed = Object.create(null)
  if (!header) {
    return parsed
  }
  header.split('\r\n').forEach(line => {
    let [key, value] = line.split(':')
    if (!key) {
      return
    }
    if (value) {
      parsed[key.trim().toLowerCase()] = value.trim()
    }
  })
  return parsed
}

export function transformResponseData(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch {}
  }
  return data
}

export function extend<T, U>(to: T, from: U): T & U {
  for (let key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepCopy(...objs: any[]) {
  let result = Object.create(null)
  objs.forEach(t => {
    if (t) {
      Object.keys(t).forEach(key => {
        let val = t[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepCopy(result[key], val)
          } else {
            result[key] = deepCopy(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}

export function mergeConfig(
  config1: XosRequestConfig,
  config2?: XosRequestConfig
): XosRequestConfig {
  if (!config2) {
    config2 = {}
  }
  let header1 = config1.header || {}
  let header2 = config2.header || {}

  let copyHeader = deepCopy(header1, header2)

  let mergerd: XosRequestConfig = {
    ...config1,
    ...config2
  }
  if (mergerd.header) {
    mergerd.header = copyHeader
  }
  return mergerd
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return
  }
  headers = deepCopy(headers.common, headers[method], headers)
  let methodsToDelete = ['get', 'post', 'delete', 'put', 'patch', 'head', 'options', 'common']
  methodsToDelete.forEach(key => {
    delete headers[key]
  })
  return headers
}
