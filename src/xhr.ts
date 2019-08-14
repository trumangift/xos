import { XosRequestConfig } from './types/index';

export default function xhr(config: XosRequestConfig): void {
  const { method = 'get', url, data = null, param } = config
  let xtr = new XMLHttpRequest()
  xtr.open(method.toUpperCase(), url, true);
  if (typeof data === 'string') {
     xtr.setRequestHeader('content-type','application/json;charset=utf-8');
  }
  xtr.send(data);
}
