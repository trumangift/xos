import qs from 'qs'
import { XosRequestConfig, XosResponseConfig, XosPromise } from './types/index'
import { transResponseHeaderToJSON, isPlainObject } from './tools/util'
import { createError } from './tools/error'
import transform from './core/transform'

export default function xhr(config: XosRequestConfig): XosPromise {
  let responsePromise: XosPromise = new Promise(function(resolve, reject) {
    let { method = 'get', url, data = null, header, responseType, timeout } = config
    let xtr = new XMLHttpRequest()
    if (responseType) {
      xtr.responseType = responseType
    }
    xtr.open(method.toUpperCase(), url!, true)
    if (timeout) {
      xtr.timeout = timeout
    }
    xtr.onerror = function() {
      reject(createError(config, 'Network error', null, xtr))
    }
    xtr.ontimeout = function() {
      reject(createError(config, `Timeout of ${timeout} ms exceeded`, 'ECONNABORTED', xtr))
    }
    xtr.onreadystatechange = function() {
      if (xtr.status === 0) {
        return
      }
      let data = responseType === 'text' ? xtr.responseText : xtr.response
      let responseConfig: XosResponseConfig = {
        statusText: xtr.statusText,
        status: xtr.status,
        result: transform(data, header, config.transformResponse),
        header: transResponseHeaderToJSON(xtr.getAllResponseHeaders()),
        config,
        request: xtr
      }
      handleXosResponse(responseConfig)
    }
    if (header) {
      Object.keys(header).forEach(t => {
        xtr.setRequestHeader(t, header[t])
      })
    }
    if (isPlainObject(data)) {
      data = qs.stringify(data)
    }
    xtr.send(data)

    function handleXosResponse(response: XosResponseConfig) {
      if (xtr.readyState !== 4) {
        return
      }
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            config,
            `Request fail with status code ${response.status}`,
            response.statusText,
            xtr,
            response
          )
        )
      }
    }
  })
  return responsePromise
}
