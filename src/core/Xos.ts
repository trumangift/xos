import { XosRequestConfig, XosPromise, Method } from '../types';
import dispatchRequest from './dispatchRequest';

export default class Xos {
    request(url: string): XosPromise
    request(config: XosRequestConfig): XosPromise
    request(url: any, config?: XosRequestConfig): XosPromise
    request(url: any, config?: XosRequestConfig): XosPromise {
        if (typeof url === 'string') {
            if (!config) {
                config = {};
            }
            config.url = url;
        } else {
            config = url;
        }
        return dispatchRequest(config!);
    }
    get(url: string, config?: XosRequestConfig): XosPromise {
        return this._requestMethodWithoutData('get',  url, config);
    }
    delete(url: string, config?: XosRequestConfig): XosPromise {
        return this._requestMethodWithoutData('delete', url, config);
    }
    head(url: string, config?: XosRequestConfig): XosPromise {
        return this._requestMethodWithoutData('head', url, config);
    }
    options(url: string, config?: XosRequestConfig): XosPromise {
        return this._requestMethodWithoutData('options', url, config);
    }
    post(url: string, data?: any, config?: XosRequestConfig): XosPromise {
        return this._requestMethodWithData('post', url, data, config);
    }
    put(url: string, data?: any, config?: XosRequestConfig): XosPromise {
        return this._requestMethodWithData('put', url, data, config);
    }
    patch(url: string, data?: any, config?: XosRequestConfig): XosPromise {
        return this._requestMethodWithData('patch', url, data, config);
    }
    _requestMethodWithoutData(method: Method,url: string, config?: XosRequestConfig) {
        return this.request(Object.assign(config || {}, {
            url,
            method
        }));
    }
    _requestMethodWithData(method: Method,url: string, data: any, config?: XosRequestConfig) {
        return this.request(Object.assign(config || {}, {
            url,
            method,
            data
        }));
    }
}