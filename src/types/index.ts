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
  url: string
  method?: Method
  data?: any
  param?: any
  header?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface XosResponseConfig {
  data: any
  status: number
  statusText: string
  header: any
  config: XosRequestConfig
  request: any
}

export interface XosPromise extends Promise<XosResponseConfig> {}
