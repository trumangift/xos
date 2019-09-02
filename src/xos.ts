import { XosRequestConfig, XosStatic } from './types/index'
import Xos from './core/Xos'
import { extend, mergeConfig } from './tools/util'
import defaults from './defaults'

function createInstance(config: XosRequestConfig): XosStatic {
  let xos = new Xos(config)
  let xosRequestMethod = Xos.prototype.request.bind(xos)
  extend(xosRequestMethod, xos)
  return xosRequestMethod as XosStatic
}
const xos = createInstance(defaults)
xos.create = function(config: XosRequestConfig): XosStatic {
  const xos = createInstance(mergeConfig(defaults, config))
  return xos
}

export default xos
