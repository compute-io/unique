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

	it( 'should throw an error if not provided an array-like object', function test() {
		var values = [
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
				unique( value );
			};
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				unique( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				unique( [1,2,3],  {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option when using an accessor', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				unique( [{'x':1},{'x':2},{'x':3}],  {
					'accessor': getValue,
					'dtype': value
				});
			};
		}

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should find the unique values of a sorted array', function test() {
		var data, expected, out;

		data = [ 1, 1, 2, 2, 3, 3, 7, 7 ];

		expected = [ 1, 2, 3, 7 ];

		out = unique( data, {
			'sorted': true
		});

		assert.deepEqual( out, expected );
	});

	it( 'should find the unique values of a sorted array and cast result to a different dtype', function test() {
		var data, expected, out, i;

		data = [ 1, 1, 2, 2, 3, 3, 7, 7 ];

		expected = new Int32Array( [ 1, 2, 3, 7 ] );

		out = unique( data, {
			'sorted': true,
			'dtype': 'int32'
		});

		for ( i = 0; i < out.length; i++ ) {
			assert.strictEqual( out[ i ], expected[ i ] );
		}
	});

	it( 'should find the unique values of a sorted typed array and cast result to a different dtype', function test() {
		var data, expected, out, i;

		data = new Int16Array( [ 1, 1, 2, 2, 3, 3, 7, 7 ] );

		expected = new Int32Array( [ 1, 2, 3, 7 ] );

		out = unique( data, {
			'sorted': true,
			'dtype': 'int32'
		});

		for ( i = 0; i < out.length; i++ ) {
			assert.strictEqual( out[ i ], expected[ i ] );
		}
	});

	it( 'should find the unique values of a sorted array using an accessor and cast result to a different dtype', function test() {
		var data, expected, out, i;

		data = [ {'x':1}, {'x':1}, {'x':2}, {'x':2}, {'x':3}, {'x':3}, {'x':7}, {'x':7} ];

		expected = new Int32Array( [ 1, 2, 3, 7 ] );

		out = unique( data, {
			'sorted': true,
			'accessor': getValue,
			'dtype': 'int32'
		});

		for ( i = 0; i < out.length; i++ ) {
			assert.strictEqual( out[ i ], expected[ i ] );
		}

		function getValue( d ) {
			return d.x;
		}
	});


	it( 'should find the unique values of an unsorted array and return sorted results', function test() {
		var data, expected, out;

		data = [ 2, 1, 3, 1, 5, 7, 1, 13, 7, 9 ];

		expected = [ 1, 2, 3, 5, 7, 9, 13 ];

		out = unique( data );

		assert.deepEqual( out, expected );

		// Mutate the input array:
		out = unique( data, {
			'copy': false
		});

		assert.deepEqual( data, expected );

	});

	it( 'should find the unique values of an unsorted typed array and return the sorted results', function test() {
		var data, expected, out, i;

		data = new Int32Array( [ 2, 1, 3, 1, 5, 7, 1, 13, 7, 9 ] );

		expected = new Int32Array( [ 1, 2, 3, 5, 7, 9, 13 ] );

		out = unique( data );

		for ( i = 0; i < out.length; i++ ) {
			assert.strictEqual( out[ i ], expected[ i ] );
		}

		// Mutate the input array:
		out = unique( data, {
			'copy': false
		});

		for ( i = 0; i < out.length; i++ ) {
			assert.strictEqual( data[ i ], expected[ i ] );
		}

	});

	it( 'should find the unique values of an unsorted object array using an accessor function and return the sorted results', function test() {
		 var data, expected, out;

		data = [
			 {'x':2}, {'x':1}, {'x':3}, {'x':1}, {'x':5}, {'x':7}, {'x':1}, {'x':13}, {'x':7}, {'x':9}
		];

		expected = [ 1, 2, 3, 5, 7, 9, 13 ];

		out = unique( data, {
			'accessor': getValue
		});

		assert.deepEqual( out, expected );

		// Mutate the input array:
		out = unique( data, {
			'accessor': getValue,
			'copy': false
		});

		assert.deepEqual( data, expected );

		function getValue( d ) {
			return d.x;
		}

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
