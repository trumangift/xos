
import xos, {XosError, XosRequestConfig, XosTransformer} from '../../src';
import qs from 'qs';

// xos.interceptors.request.use(config => {
//     config.header.token = '1';
//     return config;
// });

// xos.interceptors.response.use(data => {
//     return data;
// });

// xos.defaults.header.common['test1'] = 'test1';
// xos({
//   url: '/base/post',
//   data: qs.stringify({a:1,b:2}),
//   method: 'post',
//   header: {
//       test: 'test'
//   }
// }).then(d => {
//     console.log(d);
// });








// xos({
//   url: '/base/get',
//   param: {
//       a: 1,
//       b: 2,
//   }
// });

// xos({
//   url: '/base/get',
//   param: {
//       a: 1,
//       b: 2,
//       foo: {
//         c: 3
//       }
//   }
// });


// xos({
//   url: '/base/get',
//   param: {
//       a: 1,
//       b: 2,
//       foo: ['a', 'b']
//   }
// });


// xos({
//   url: '/base/get',
//   param: {
//       a: 1,
//       b: 2,
//       foo: new Date()
//   }
// });


// xos({
//   url: '/base/get',
//   param: {
//       a: 1,
//       baz: null
//   }
// });

// xos({
//   url: '/base/get?name=2',
//   param: {
//       a: 1,
//       baz: null
//   }
// });

// xos({
//   method: 'post',
//   url: '/base/post',
//   data: {
//       a: 1,
//       b: 2,
//       baz: null
//   }
// });

// xos({
//   method: 'post',
//   url: '/base/buffer',
//   data: new Blob(['1','2','3'], {type: 'text/html'})
// });

// const intArray = new Int32Array([22,42]);
// xos({
//   method: 'post',
//   url: '/base/buffer',
//   data: intArray
// });



// xos({
//   method: 'post',
//   url: '/base/post',
//   data: {
//       a: 1,
//       b: 2,
//       baz: null
//   }
// });

// let paramsData = 'c=1&d=2';
// let searchParams = new URLSearchParams(paramsData);

// xos({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams,
// });


// xos({
//   method: 'post',
//   url: '/base/post',
//   header: {
//      'content-type': 'application/json;charset=utf-8',
//      'Accept': 'application/json,text/plain,*/*'
//   },
//   data: {
//       a: 1,
//       b: 2,
//       baz: null
//   },
// }).then(d => {
//    console.log(d);
// });

// xos({
//    method: 'post',
//    url: '/base/post',
//    header: {
//       'content-type': 'application/json;charset=utf-8',
//       'Accept': 'application/json,text/plain,*/*'
//    },
//    data: {
//        a: 1,
//        b: 2,
//        baz: null
//    },
//    responseType: 'json'
//  }).then(d => {
//     console.log(d);
//  });


// xos({
//    method: 'post',
//    url: '/base/post',
//    data: {
//        a: 1,
//        b: 2,
//        baz: null
//    },
//    timeout: 4000
//  }).then(d => {
//     console.log(d);
//  });

// xos({
//    method: 'post',
//    url: '/base/post/a',
//    data: {
//        a: 1,
//        b: 2,
//        baz: null
//    },
//  }).then(d => {
//     console.log(d);
//  }).catch(e => {
//     console.log(e);
//  })

// xos({
//    method: 'post',
//    url: '/base/post/a',
//    data: {
//        a: 1,
//        b: 2,
//        baz: null
//    },
//    timeout: 4000
//  }).then(d => {
//     console.log(d);
//  }).catch((e: XosError) => {
//     console.log(e.message, e.code, e.config, e.request, e.response);
//  })


// xos.get('/extend/get');
// xos.post('/extend/post', {a: 1, b: 2});
// xos.put('/extend/put', {a: 1, b: 2});
// xos.patch('/extend/patch', {a: 1, b: 2});


// xos('/base/post', {
//    method: 'post',
//    data: {
//        a: 1,
//        b: 2,
//        baz: null
//    },
//  });

// interface responseData<T = any> {
//    code: number
//    result: T
//    message: string
// }

// interface user {
//    name: string
//    age: number
// }

// function getUser<T>() {
//    const result =  xos<responseData<T>>('/extend/user')
//    .then(res =>  res.result)
//    .catch(err => console.error(err));
//    return result;
// }

// async function test() {
//    const user = await getUser<user>();
// }

// test();


// xos({
//   url: '/base/post',
//   data: qs.stringify({a:1,b:2}),
//   method: 'post',
//   header: {
//       test: 'test'
//   }
// }).then(d => {
//     console.log(d);
// });

// let newXosInstance = xos.create(
//   {
//     url: '/base/post',
//     data: {a:1,b:2},
//     method: 'post',
//     header: {
//         test: 'test'
//     },
//     transformRequest: [
//       (data) => {
//         data.c = 3;
//         return qs.stringify(data);
//       },
//       (data, header) => {
//           header.test = 2; 
//           return data;
//       }
//     ],
//     transformResponse: [
//       ...(xos.defaults.transformResponse as XosTransformer[]),
//       (data) => {
//         if (typeof data === 'object') {
//           data.c = 5;
//         }
//         return data;
//       }
//     ],
//   }
// );


// newXosInstance({
//   data: {c:3},
// }).then(d => {
//    console.log(d);
// });