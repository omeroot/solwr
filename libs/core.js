var Query = require( './query' ),
    utils = require( './_utils' ),
    e     = require( './error' );

function Core ( opts ) {
  this.__name   = opts.name;
  this.__format = opts.wt || 'json';
}

Core.prototype.removeCore = function removeCore ( conditions, opts, callback ) {
  if ( typeof conditions === 'function' ) {
    callback   = conditions;
    conditions = '*:*';
  }

  if ( !opts ) {
    opts = {};
  }

  // get the mongodb collection object
  var cq = new Query( conditions, opts, this );

  if ( callback ) {
    callback = this.$wrapCallback( callback );
  }

  return cq.removeCore( callback );
};

Core.prototype.find = function find ( conditions, opts, callback ) {
  if ( typeof conditions === 'function' ) {
    callback   = conditions;
    conditions = '*:*';
  }

  if ( !opts ) {
    opts = {};
  }

  // get the mongodb collection object
  var cq = new Query( conditions, opts, this );

  if ( callback ) {
    callback = this.$wrapCallback( callback );
  }

  return cq.find( callback );
};

Core.prototype.remove = function remove ( conditions, opts, callback ) {
  if ( typeof conditions === 'function' ) {
    callback   = conditions;
    conditions = '*:*';
  }

  if ( !opts ) {
    opts        = {};
    opts.format = 'xml';
  }

  // get the mongodb collection object
  var cq = new Query( conditions, opts, this );

  if ( callback ) {
    callback = this.$wrapCallback( callback );
  }

  return cq.remove( callback );
};

Core.prototype.create = function create ( data, opts, callback ) {
  if ( !data ) e( e.type.EMPTY_DATA );
  if ( !opts ) {
    opts = {};
  }

  if ( typeof data === 'object' ) {
    opts.dataFormat = 'json'
  } else if ( typeof data === 'string' ) {
    opts.dataFormat = 'xml';
  } else {
    e( e.type.WRONG_TYPE );
  }

  var cq = new Query( null, opts, this );

  if ( callback ) {
    callback = this.$wrapCallback( callback );
  }

  if ( utils.isObject( data ) ) {
    data = JSON.stringify( data );
  }

  return cq.create( data, callback );
};

Core.prototype.$wrapCallback = function ( callback ) {
  return function () {
    try {
      callback.apply( null, arguments );
    } catch ( error ) {
      console.log( "wrapCallback", error );
    }
  };
};

module.exports = Core;