import { XosRequestConfig, XosResponseConfig, XosPromise } from './types/index';
import { transResponseHeaderToJSON, transformResponseData } from './tools/util';
import { createError } from './tools/error';


export default function xhr(config: XosRequestConfig): XosPromise {
  let responsePromise: XosPromise = new Promise(function(resolve, reject) {
    const { method = 'get', url, data = null, header, responseType, timeout } = config
    let xtr = new XMLHttpRequest()
    if (responseType) {
      xtr.responseType = responseType
    }
    xtr.open(method.toUpperCase(), url, true)
    if (timeout) {
      xtr.timeout = timeout
    }
    xtr.onerror = function() {
      reject(
        createError(config, 'Network error', null, xtr)
      )
    }
    xtr.ontimeout = function() {
      reject(
        createError(config, `Timeout of ${timeout} ms exceeded`, 'ECONNABORTED', xtr)
      )
    }
    xtr.onreadystatechange = function() {
      if (xtr.status === 0) {
        return
      }
      let responseConfig: XosResponseConfig = {
        statusText: xtr.statusText,
        status: xtr.status,
        data: transformResponseData(responseType === 'text' ? xtr.responseText : xtr.response),
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
    xtr.send(data)

    function handleXosResponse(response: XosResponseConfig) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject( createError(config, `Request fail with status code ${response.status}`, response.statusText, xtr, response));
      }
    }
  })
  return responsePromise
}
