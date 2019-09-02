import {
  XosRequestConfig,
  XosPromise,
  Method,
  Interceptors,
  XosResponseConfig,
  PromiseChain
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorsManage from './interceptorsManage'
import { mergeConfig, flattenHeaders } from '../tools/util'

export default class Xos {
  interceptors: Interceptors
  defaults: XosRequestConfig
  constructor(config: XosRequestConfig) {
    this.interceptors = {
      request: new InterceptorsManage<XosRequestConfig>(),
      response: new InterceptorsManage<XosResponseConfig>()
    }
    this.defaults = config
  }
  request(url: string): XosPromise
  request(config: XosRequestConfig): XosPromise
  request(url: any, config?: XosRequestConfig): XosPromise
  request(url: any, config?: XosRequestConfig): XosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    config = mergeConfig(this.defaults, config)
    config.header = flattenHeaders(config.header, config.method || 'get')
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(t => {
      chain.unshift(t)
    })
    this.interceptors.response.forEach(t => {
      chain.push(t)
    })
    let chainPromise = Promise.resolve(config!)

    while (chain.length) {
      let { resolved, rejected } = chain.shift()!
      chainPromise = chainPromise.then(resolved, rejected)
    }
    return chainPromise as XosPromise
  }
  get(url: string, config?: XosRequestConfig): XosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }
  delete(url: string, config?: XosRequestConfig): XosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }
  head(url: string, config?: XosRequestConfig): XosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }
  options(url: string, config?: XosRequestConfig): XosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }
  post(url: string, data?: any, config?: XosRequestConfig): XosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: XosRequestConfig): XosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: XosRequestConfig): XosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }
  _requestMethodWithoutData(method: Method, url: string, config?: XosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        url,
        method
      })
    )
  }
  _requestMethodWithData(method: Method, url: string, data: any, config?: XosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        url,
        method,
        data
      })
    )
  }
}
