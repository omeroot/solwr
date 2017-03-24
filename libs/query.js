var axios = require( "axios" );

function Query ( conditions, opts, core ) {
  this.conditions = conditions;
  this.opts       = opts;
  this.core       = core;

  this.opts.format = this.opts.format || this.core.__format;

  var urlBase = __solwr__.host + ":" + __solwr__.port;

  this.urlPrefix = {
    admin: urlBase + "/solr/admin/",
    core : urlBase + "/solr/" + this.core.__name + "/"
  };
}

Query.prototype.only = function () {
  this.__only__ = true;

  return this;
};

Query.prototype._only = function ( response ) {
  var _data;

  switch ( this.opts.format ) {
    case 'json':
      _data = ( this.__only__ ) ? response.data.response.docs : response.data.response;
      break;
    case 'xml':
      _data = response.data;
  }

  return _data;
};

Query.prototype.find = function ( callback ) {
  this.$url = this.urlPrefix.core + "select?q=" + this.conditions;
  this.$url += "&wt=" + this.opts.format;

  this.__method__ = "GET";

  if ( callback ) this.__callback__ = callback;

  return this;
};

Query.prototype.create = function ( data, callback ) {
  var cType;

  switch ( this.opts.dataFormat ) {
    case 'json':
      cType             = 'application/json';
      this.$url         = this.urlPrefix.core + 'update/json/docs?commit=true';
      this.__dataType__ = 'json';
      break;
    case 'xml':
      cType             = 'text/xml';
      this.$url         = this.urlPrefix.core + 'update/?commit=true';
      this.__dataType__ = 'xml';
      break;
    default:
      cType = 'application/json';
  }

  this.__method__      = "POST";
  this.__contentType__ = cType;
  this.__data__        = data;

  if ( callback ) this.__callback__ = callback;

  return this;
};

Query.prototype.format = function ( val ) {
  this.opts.format = val;

  return this;
};

Query.prototype.sort = function ( val ) {
  this.$url += "&sort=" + val;

  return this;
};

Query.prototype.skip = function ( val ) {
  this.$url += "&start=" + val;

  return this;
};

Query.prototype.limit = function ( val ) {
  this.$url += "&rows=" + val;

  return this;
};

Query.prototype.remove = function ( callback ) {
  this.$url       = this.urlPrefix.core + "update?commit=true&stream.body=<delete><query>" + this.conditions + "</query></delete>";
  this.__method__ = "GET";

  if ( callback ) this.__callback__ = callback;

  return this;
};

Query.prototype.exec = function () {
  var _this = this;
  console.log( "[REQUEST] " + this.$url );

  return new Promise( function ( approve, reject ) {
    if ( _this.__callback__ ) {
      approve = function ( data ) {
        return _this.__callback__( null, data );
      };
      reject  = _this.__callback__;
    }

    switch ( _this.__method__ ) {
      case 'GET':
        axios.get( _this.$url )
          .then( function ( _res ) {
            approve( _this._only( _res ) );
          } )
          .catch( reject );
        break;
      case 'POST':
        axios.get( _this.$url, {
          method : 'POST',
          data   : _this.__data__,
          headers: {
            'Content-Type': _this.__contentType__
          }
        } )
          .then( function ( _res ) {
            if ( _this.__dataType__ === 'json' ) {
              if ( _res.status && _res.data.responseHeader.status === 0 ) {
                approve( _res.data );
                return;
              }

              reject( _res );
            } else if ( _this.__dataType__ === 'xml' ) {
              if ( _res.status && _res.data.indexOf( '<int name="status">0</int>' ) >= 0 ) {
                approve( _res.data );
                return;
              }

              reject( _res );
            }
          } )
          .catch( reject );
        break;
    }
  } );
};

Query.prototype.removeCore = function ( callback ) {
  this.$url       = this.urlPrefix.admin + "cores?action=UNLOAD&core=" + this.core.__name;
  this.__method__ = "GET";

  for ( var i in this.opts ) {
    this.$url += "&" + i + "=" + this.opts[ i ];
  }

  this.$url += ("&wt=" + this.opts.format);

  if ( callback ) {
    this.__callback__ = callback;
    this.exec();

    return 1;
  }

  return this;
};


module.exports = Query;