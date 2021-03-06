'use strict';

var unique = require( './../lib' );

// Simulate some data...
var data = new Array( 1000 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*10 );
}

// Determine the unique values:
unique( data );

console.log( data.join( '\n' ) );
// returns (with high probability) an array of length 11 with values 0:1:10
