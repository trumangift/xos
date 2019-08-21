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