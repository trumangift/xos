import xos from '../../src/index';

xos({
  url: '/base/get',
  param: {
      a: 1,
      b: 2,
  }
});

xos({
  url: '/base/get',
  param: {
      a: 1,
      b: 2,
      foo: {
        c: 3
      }
  }
});


xos({
  url: '/base/get',
  param: {
      a: 1,
      b: 2,
      foo: ['a', 'b']
  }
});


xos({
  url: '/base/get',
  param: {
      a: 1,
      b: 2,
      foo: new Date()
  }
});


xos({
  url: '/base/get',
  param: {
      a: 1,
      baz: null
  }
});

xos({
  url: '/base/get?name=2',
  param: {
      a: 1,
      baz: null
  }
});