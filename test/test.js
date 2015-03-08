'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	unique = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-unique', function tests() {

	it( 'should export a function', function test() {
		expect( unique ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an array', function test() {
		var values = [
			'5',
			5,
			null,
			NaN,
			undefined,
			true,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				unique( value, true );
			};
		}
	});

	it( 'should throw an error if second argument is not a boolean', function test() {
		var values = [
			'5',
			5,
			null,
			NaN,
			undefined,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				unique( [], value );
			};
		}
	});

	it( 'should find the unique values of a sorted array', function test() {
		var data, expected;

		data = [ 1, 1, 2, 2, 3, 3, 7, 7 ];

		expected = [ 1, 2, 3, 7 ];

		unique( data, true );

		assert.deepEqual( data, expected );
	});

	it( 'should find the unique values of an unsorted array and return sorted results', function test() {
		var data, expected;

		data = [ 2, 1, 3, 1, 5, 7, 1, 13, 7, 9 ];

		expected = [ 1, 2, 3, 5, 7, 9, 13 ];

		unique( data );

		assert.deepEqual( data, expected );
	});

	it( 'should do nothing if provided an empty array', function test() {
		var data, expected;

		data = [];
		expected = [];

		unique( data );
		assert.deepEqual( data, expected );
		assert.strictEqual( data.length, 0 );
	});

});
