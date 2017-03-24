var utils = require( "./_utils" );

exports = module.exports = function ( type, message ) {
  var _message = '';

  if ( !type || typeof type !== 'string' ) throw new Error( 'wrong error type' );

  if ( typeof message === "string" ) {
    _message += message;
  }

  if ( _message.substr( 0, 1 ) !== " " ) _message = " " + _message;

  _message = type.replace( '$you', _message );

  throw new Error( _message );
};

exports.type = {
  MISSING_TYPE : 'missing arguments $you',
  CORE_REGISTER: 'unregistered core $you',
  WRONG_HOST   : 'host is wrong or not defined',
  WRONG_PORT   : 'port is wrong or not defined',
  WRONG_TYPE   : 'parameter type is not valid',
  ALREADY_EXIST: 'core already exist $you',
  EMPTY_DATA   : 'data is empty for create'
};