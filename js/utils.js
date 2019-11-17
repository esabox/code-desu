let hoge = {
  fn: function foo() {
    console.log('foo')
  }
};

function baz(str = '') {
  console.log('local expo df fn ' + str);
}

export {hoge};
export default baz;