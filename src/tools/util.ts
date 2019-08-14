const toStr = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toStr.call(val) === '[object Date]'
}

export function encodeUrl(uri: string): string {
  return encodeURIComponent(uri)
}

export function isPlainObject(data: any): data is Object {
   return toStr.call(data) === '[object Object]';
}

export function transformSendData(data: any): any {
   if (isPlainObject(data)) {
     return JSON.stringify(data);
   }
   return data;
}
