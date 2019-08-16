import { XosRequestConfig, XosResponseConfig, XosPromise } from './types/index'
import { transResponseHeaderToJSON } from './tools/util'

export default function xhr(config: XosRequestConfig): XosPromise {
  let responsePromise: XosPromise = new Promise(function(resolve, reject) {
    const { method = 'get', url, data = null, header, responseType } = config
    let xtr = new XMLHttpRequest()
    if (responseType) {
      xtr.responseType = responseType
    }
    xtr.open(method.toUpperCase(), url, true)
    xtr.onreadystatechange = function() {
      let responseConfig: XosResponseConfig = {
        statusText: xtr.statusText,
        status: xtr.status,
        data: responseType === 'text' ? xtr.responseText : xtr.response,
        header: transResponseHeaderToJSON(xtr.getAllResponseHeaders()),
        config,
        request: xtr
      }
      if (xtr.readyState === 4) {
        if (xtr.status === 200) {
          resolve(responseConfig)
        } else {
          reject(responseConfig)
        }
      }
    }
    if (header) {
      Object.keys(header).forEach(t => {
        xtr.setRequestHeader(t, header[t])
      })
    }
    xtr.send(data)
  })
  return responsePromise
}
