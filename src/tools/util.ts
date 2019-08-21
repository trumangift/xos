import { type } from 'os';
const toStr = Object.prototype.toString;

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

export function extend<T,U>(to: T, from: U):T&U{
     for(let key in from) {
         (to as T&U )[key] = from[key] as any; 
     } 
     return to as T & U;
}