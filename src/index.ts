import { XosRequestConfig } from './types/index'
import xhr from './xhr'
import { buildUrl } from './tools/url';
import { transformSendData } from './tools/util';

function processConfig(config: XosRequestConfig): void {
      config.url = buildUrl(config.url, config.param);
      config.data = transformSendData(config.data);
}

function xos(config: XosRequestConfig): void {
  processConfig(config);
  xhr(config)
}

export default xos;
