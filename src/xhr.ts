import { XosRequestConfig } from './types/index'
import { buildUrl } from './tools/url'
export default function xhr(config: XosRequestConfig): void {
  const { method = 'get', url, data = null, param } = config
  let xtr = new XMLHttpRequest()
  xtr.open(method.toUpperCase(), buildUrl(url, param), true)
  xtr.send(data)
}
