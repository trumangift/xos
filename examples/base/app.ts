import xos from '../../src/index';

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
//   header: {
//      'content-type': 'application/json;charset=utf-8',
//      'Accept': 'application/json,text/plain,*/*'
//   },
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


xos({
  method: 'post',
  url: '/base/post',
  header: {
     'content-type': 'application/json;charset=utf-8',
     'Accept': 'application/json,text/plain,*/*'
  },
  data: {
      a: 1,
      b: 2,
      baz: null
  },
}).then(d => {
   console.log(d);
});

xos({
   method: 'post',
   url: '/base/post',
   header: {
      'content-type': 'application/json;charset=utf-8',
      'Accept': 'application/json,text/plain,*/*'
   },
   data: {
       a: 1,
       b: 2,
       baz: null
   },
   responseType: 'json'
 }).then(d => {
    console.log(d);
 });