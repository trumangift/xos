import { XosRequestConfig, XosPromise, XosInstance } from '../types'
import xhr from '../xhr'
import { buildUrl } from '../tools/url'
import { transformSendData, processHeaders } from '../tools/util';

function processConfig(config: XosRequestConfig): void {
  const { url, param, data, header } = config
  config.url = buildUrl(url!, param)
  config.header = processHeaders(header, data)
  config.data = transformSendData(data)
}

function dispatchRequest(config: XosRequestConfig): XosPromise {
  processConfig(config)
  return xhr(config)
}
export default dispatchRequest;
