var solwr = require( "./../index" );

var chai = require( "chai" );

var expect = chai.expect;

describe( "Query", function () {
  solwr.address( {
    host: "http://127.0.0.1",
    port: 8983
  } );

  describe( "Document", function () {
    var queryTest = solwr.core( "querytest" );

    it( "create JSON", function ( done ) {
      queryTest.create( { id: '4', name: 'omer' } )
        .exec()
        .then( function ( result ) {
          done();
        } )
        .then( null, function ( err ) {
          console.log( err );
        } )
    } );

    it( "create XML", function ( done ) {
      queryTest.create( "<add><doc><field name='name'>Omer</field></doc></add>" )
        .exec()
        .then( function ( result ) {
          done();
        } )
        .then( null, function ( err ) {
          console.log( err );
        } )
    } );

    it( "create JSON Array", function ( done ) {
      queryTest.create( [ { id: '5', name: 'markakod' }, { id: 21, name: 'kadikoy' } ] )
        .exec()
        .then( function ( result ) {
          done();
        } )
        .then( null, function ( err ) {
          console.log( err );
        } )
    } );

    it( "create XML Array", function ( done ) {
      queryTest.create( "<add><doc><field name='name'>XXX</field></doc><doc><field name='name'>YYY</field></doc></add>" )
        .exec()
        .then( function ( result ) {
          done();
        } )
        .then( null, function ( err ) {
          console.log( err );
        } )
    } );

    it( "find", function ( done ) {
      queryTest.find( "*:*" )
        .exec()
        .then( function ( result ) {
          done();
        } )
        .then( null, function ( error ) {
          console.log( error );
        } );
    } );

    it( "only", function ( done ) {
      queryTest.find( "*:*" )
        .only()
        .exec()
        .then( function ( result ) {
          done();
        } )
        .then( null, function ( error ) {
          console.log( error );
        } );
    } );

    it( "xml", function ( done ) {
      queryTest.find( "*:*", { format: 'xml' } )
        .exec()
        .then( function ( result ) {
          done();
        } )
        .then( null, function ( error ) {
          console.log( error );
        } );
    } );

    it( "sort", function ( done ) {
      queryTest.find( "*:*" )
        .sort( 'id desc' )
        .only()
        .exec()
        .then( function ( result ) {
          done();
        } )
        .then( null, function ( error ) {
          console.log( error );
        } );
    } );

    it( "limit", function ( done ) {
      queryTest.find( "*:*" )
        .limit( 1 )
        .only()
        .exec()
        .then( function ( result ) {
          done();
        } )
        .then( null, function ( error ) {
          console.log( error );
        } );
    } );

    it( "skip", function ( done ) {
      queryTest.find( "*:*" )
        .skip( 1 )
        .only()
        .exec()
        .then( function ( result ) {
          done();
        } )
        .then( null, function ( error ) {
          console.log( error );
        } );
    } );

    it( "remove With condition", function ( done ) {
      queryTest.remove( "name:Omer" )
        .exec()
        .then( function ( result ) {
          done();
        } )
        .then( null, function ( error ) {
          console.log( error );
        } );
    } );
  } );
} );