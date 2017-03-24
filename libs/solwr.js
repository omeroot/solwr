var utils = require( "./_utils" ),
    e     = require( "./error" ),
    Core  = require( "./core" );

function Solwr () {
  this._cores = {};
}

Solwr.prototype.address = function ( opts ) {
  if ( !opts.host ) e( e.type.WRONG_HOST );
  if ( !opts.port ) e( e.type.WRONG_PORT );

  this.host = opts.host;
  this.port = opts.port;

  global.__solwr__ = {
    host: this.host,
    port: this.port
  }
};

Solwr.prototype.core = function ( name, opts ) {
  var c;

  if ( typeof name !== "string" || !name.length ) e( e.type.MISSING_TYPE, 'core' );
  if ( opts && !utils.isObject( opts ) ) e( e.type.WRONG_TYPE );

  if ( opts && utils.isObject( opts ) ) {
    if ( this._cores[ name ] ) e( e.type.ALREADY_EXIST, 'name=' + name );
    opts.name = name;
  }

  //TODO will delete later
  if ( !opts && !this._cores[ name ] ) {
    opts      = {};
    opts.name = name;
  }

  c = (this._cores[ name ]) ? this._cores[ name ] : new Core( opts || {} );

  if ( !c ) e( e.type.CORE_REGISTER );
  if ( !this._cores[ name ] ) {
    this._cores[ name ] = c;
  }

  return c;
};

Solwr.prototype.getCore = function ( name ) {
  if ( typeof name !== "string" ) e( e.type.WRONG_TYPE, this.getCore );

  return this._cores[ name ];
};

module.exports = exports = new Solwr;
