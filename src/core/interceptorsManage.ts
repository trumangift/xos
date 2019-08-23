import {ResolvedFn, RejectedFn, Interceptor } from '../types';

export default class InterceptorsManage<T>{
    private interceptors: Array<Interceptor<T> | null>;

    constructor() {
        this.interceptors = [];
    }
    
    use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
        this.interceptors.push({
            resolved,
            rejected,
        });
        return this.interceptors.length -1;
    }
    forEach(fn: (interceptor: Interceptor<T>) => void): void {
        this.interceptors.forEach(t => {
            if (t) {
                fn(t);
            }
        });
    }
    inject(id: number): void {
        if (this.interceptors[id]) {
            this.interceptors[id] = null;
        }
    }
}