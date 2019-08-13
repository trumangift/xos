import { XosRequestConfig } from './types/index'
import xhr from './xhr'

function xos(config: XosRequestConfig): void {
  xhr(config)
}

export default xos
