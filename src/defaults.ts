import { XosRequestConfig } from './types'
import { transformSendData, processHeaders, transformResponseData } from './tools/util'

const defaults: XosRequestConfig = {
  method: 'get',
  timeout: 0,
  header: {
    common: {
      Accept: 'application/json,text/plain,*/*'
    }
  },
  transformRequest: [
    function(data: any, header?: any): any {
      processHeaders(header, data)
      return transformSendData(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponseData(data)
    }
  ]
}
const methodsNoData = ['get', 'delete', 'head', 'options']
methodsNoData.forEach(t => {
  defaults.header[t] = {}
})

const methodsWithData = ['put', 'post', 'patch']
methodsWithData.forEach(t => {
  defaults.header[t] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
