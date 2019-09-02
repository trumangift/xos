import { XosRequestConfig, XosPromise, XosInstance } from '../types'
import xhr from '../xhr'
import { buildUrl } from '../tools/url'
import transform from './transform'

function processConfig(config: XosRequestConfig): void {
  const { url, param, data, header, transformRequest } = config
  config.url = buildUrl(url!, param)
  config.data = transform(data, header, transformRequest)
}

function dispatchRequest(config: XosRequestConfig): XosPromise {
  processConfig(config)
  return xhr(config)
}
export default dispatchRequest
