import { XosRequestConfig } from './types/index'

export default function xhr(config: XosRequestConfig): void {
  const { method = 'get', url, data = null, header } = config
  let xtr = new XMLHttpRequest()
  xtr.open(method.toUpperCase(), url, true)
  if (header) {
    Object.keys(header).forEach(t => {
      xtr.setRequestHeader(t, header[t])
    })
  }
  xtr.send(data)
}
