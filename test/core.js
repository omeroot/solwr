var solwr = require( "./../index" );

var chai = require( "chai" ),
    Core = require( "./../libs/core" );

var expect = chai.expect;

describe( "Core", function () {
  solwr.address( {
    host: "http://127.0.0.1",
    port: 8983
  } );

  it( "create", function ( done ) {
    var products = solwr.core( "products", { wt: 'json' } );

    expect( products ).to.be.an.instanceOf( Core );

    done();
  } );

  it( "catch create duplicate", function ( done ) {
    expect( function () {
      solwr.core( "products", { wt: 'json' } );
    } ).to.throw( Error );

    done();
  } );

  describe( "Remove", function () {
    it( "remove promise", function ( done ) {
      var products = solwr.core( "products" );

      products.removeCore()
        .exec()
        .then( function () {
          done();
        } )
        .then( null, function ( err ) {
          console.log( "error promise", err );
        } );
    } );

    it( "remove callback and non-existing", function ( done ) {
      var products = solwr.core( "products" );

      products.removeCore( function ( err, result ) {
        if ( err ) {
          done();
        }
      } );
    } );
  } );
} );