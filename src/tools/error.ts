import { XosRequestConfig, XosResponseConfig, } from '../types/index';

export class XosError extends Error {
    config: XosRequestConfig
    request?: any
    message: string
    code?: string | null
    response?: XosResponseConfig
    isXosError: boolean

    constructor
    (
        config: XosRequestConfig, 
        message: string, 
        code: string | null,
        request?: any, 
        response?: XosResponseConfig) {
       super(message);     
       this.config = config;
       this.request = request; 
       this.message = message;
       this.code = code;
       this.response = response;
       this.isXosError = true;
       Object.setPrototypeOf(this, XosError.prototype);
    }
}

export function createError(
    config: XosRequestConfig, 
    message: string, 
    code: string | null,
    request?: any, 
    response?: XosResponseConfig
) {
   const xosError = new XosError(config, message, code, request, response);
   return xosError;
}