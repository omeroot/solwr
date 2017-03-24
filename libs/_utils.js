var toString = Object.prototype.toString;

exports.isObject = function ( arg ) {
  if ( Buffer.isBuffer( arg ) ) {
    return true;
  }
  return toString.call( arg ) === '[object Object]';
};

exports.getFunctionName = function(fn) {
  if (fn.name) {
    return fn.name;
  }
  return (fn.toString().trim().match(/^function\s*([^\s(]+)/) || [])[1];
};