import { isPlainObject } from '../tools/util'

export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'patch'
  | 'PATCH'

export interface XosRequestConfig {
  url?: string
  method?: Method
  data?: any
  param?: any
  header?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: XosTransformer[] | XosTransformer
  transformResponse?: XosTransformer[] | XosTransformer
}

export interface XosTransformer {
  (data: any, headers?: any): any
}

export interface XosResponseConfig<T = any> {
  result: T
  status: number
  statusText: string
  header: any
  config: XosRequestConfig
  request: any
}

export interface XosPromise<T = any> extends Promise<XosResponseConfig<T>> {}

export interface XosError extends Error {
  config: XosRequestConfig
  request?: any
  message: string
  code?: string | null
  response?: XosResponseConfig
  isXosError: boolean
}

export interface Xos {
  request<T = any>(config: XosRequestConfig): XosPromise<T>
  interceptors: Interceptors
  defaults: XosRequestConfig
  get<T = any>(url: string, config?: XosRequestConfig): XosPromise<T>
  delete<T = any>(url: string, config?: XosRequestConfig): XosPromise<T>
  head<T = any>(url: string, config?: XosRequestConfig): XosPromise<T>
  options<T = any>(url: string, config?: XosRequestConfig): XosPromise<T>
  post<T = any>(url: string, data?: any, config?: XosRequestConfig): XosPromise<T>
  put<T = any>(url: string, data?: any, config?: XosRequestConfig): XosPromise<T>
  patch<T = any>(url: string, data?: any, config?: XosRequestConfig): XosPromise<T>
}

export interface XosInstance extends Xos {
  <T = any>(config: XosRequestConfig): XosPromise<T>
  <T = any>(url: string, config?: XosRequestConfig): XosPromise<T>
}

export interface ResolvedFn<T> {
  (config: T): Promise<T> | T
}

export interface RejectedFn {
  (error: any): any
}

export interface XosInterceptorsManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  inject(interceptorNumber: number): void
  forEach(fn: (interceptor: Interceptor<T>) => void): void
}

export interface Interceptors {
  request: XosInterceptorsManager<XosRequestConfig>
  response: XosInterceptorsManager<XosResponseConfig>
}

export interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: XosRequestConfig) => void)
  rejected?: RejectedFn
}

export interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}
