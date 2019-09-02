import { XosInstance, XosRequestConfig } from './types/index'
import Xos from './core/Xos'
import { extend } from './tools/util'
import defaults from './defaults'

function createInstance(config: XosRequestConfig): XosInstance {
  let xos = new Xos(config)
  let xosRequest = Xos.prototype.request.bind(xos)
  return extend(xosRequest, xos) as XosInstance
}

const xos = createInstance(defaults)

export default xos
