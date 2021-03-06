

/**
 * apply的模拟实现
 * 重点：
 *  1.收集传入的参数的，保留其原始的取值字符串存入数组
 *  2.通过eval来展开参数并执行
 *  3.删除ctx上添加的fn
 * @param {any} ctx 
 */
Function.prototype.myCall = function (ctx, arr) {

  try {
    ctx = Object(ctx) || window
  } catch (error) {
    console.log(error)
    return;
  }
  ctx.fn = this;
  if(!arr) {
    var result = ctx.fn();
  } else {
    var args = [];
    for (var i = 0; i < arr.length; i++) {
      // 此处必须要保留arguments[i]的原始字符串形式，否则eval执行会报错
      args.push('arr[' + i + ']');
    }
  }
  
  var result = eval('ctx.fn(' + args + ')');
  ctx.fn = null;
  return result;
}

var greet = 'hello';
var obj = {
  greet: 'shit'
}

function hello(params, num) {
  console.log(typeof num)
  console.log(this.greet, params, num)
}
hello.myCall(obj, ['hi', 2])
