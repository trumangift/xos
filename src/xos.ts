import { XosRequestConfig } from './types/index'
import xhr from './xhr'
import { buildUrl } from './tools/url'
import { transformSendData, processHeaders } from './tools/util'
import { XosPromise } from './types/index'

function processConfig(config: XosRequestConfig): void {
  const { url, param, data, header } = config
  config.url = buildUrl(url, param)
  config.header = processHeaders(header, data)
  config.data = transformSendData(data)
}

function xos(config: XosRequestConfig): XosPromise {
  processConfig(config)
  return xhr(config)
}

export default xos;
