import { XosRequestConfig } from './types/index'
import xhr from './xhr'
import { buildUrl } from './tools/url'
import { transformSendData, processHeaders } from './tools/util'

function processConfig(config: XosRequestConfig): void {
  const { url, param, data, header } = config
  config.url = buildUrl(url, param)
  config.header = processHeaders(header, data)
  config.data = transformSendData(data)
}

function xos(config: XosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

export default xos
