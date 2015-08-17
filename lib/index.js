'use strict';

// MODULES //

var cast = require( 'compute-cast-arrays' ),
	ctors = require( 'compute-array-constructors' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	validate = require( './validate.js' );


// FUNCTIONS //

/**
* FUNCTION: ascending( a, b )
*	Comparator function to sort values in ascending order.
*
* @private
* @param {Number} a
* @param {Number} b
* @returns {Number} difference between `a` and `b`
*/
function ascending( a, b ) {
	return a - b;
} // end FUNCTION ascending()


// UNIQUE //

/**
* FUNCTION: unique( arr[, opts] )
*	Removes duplicate values from an array.
*
* @param {Array} arr - array to be deduped
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [options.accessor] - accessor function for accessing array values
* @param {Boolean} [opts.sorted=false] - boolean indicating if the input array is already sorted
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Array} output array
*/
function unique( arr, options ) {
	/* jshint newcap:false */
	var opts = {},
		ctor,
		dt,
		err,
		len,
		out,
		i, j,
		val;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	if ( isTypedArrayLike( arr ) ) {
		len = arr.length;
		if ( opts.copy === false ) {
			out = arr;
		} else {
			if ( opts.dtype ) {
				out = cast( arr, opts.dtype );
			} else {
				out = Array.prototype.slice.call( arr );
			}
		}
	} else if ( isArrayLike( arr ) ) {
		len = arr.length;
		if ( opts.copy === false ) {
			if ( opts.accessor ) {
				for ( i = 0; i < len; i++ ) {
					arr[ i ] = opts.accessor( arr[ i ] );
				}
			}
			out = arr;
		} else {
			if ( opts.accessor ) {
				if ( opts.dtype ) {
					ctor = ctors( opts.dtype );
					if ( ctor === null ) {
						throw new Error( 'unique()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + opts.dtype + '`.' );
					}
					out = new ctor( len );
				} else {
					out = new Array( len );
				}
				for ( i = 0; i < len; i++ ) {
					out[ i ] = opts.accessor( arr[ i ] );
				}
			} else {
				if ( opts.dtype ) {
					out = cast( arr, opts.dtype );
				} else {
					out = arr.slice();
				}
			}
		}
	} else {
		throw new TypeError( 'unique()::invalid input argument. First argument must be an array or typed array.' );
	}

	if ( !len ) {
		return out;
	}

	if ( opts.sorted !== true ) {
		Array.prototype.sort.call( out, ascending );
	}

	/*
	Loop through the array, only incrementing a pointer when successive values are different.
	When a succeeding value is different, move the pointer and set the next value.
	In the trivial case where all array elements are unique,
	we incur a slight penalty in resetting the element value for each unique value.
	In other cases, we simply move a unique value to a new position in the array.
	The end result is a sorted array with unique values.
	*/

	for ( i = 1, j = 0; i < len; i++ ) {
		val = out[ i ];
		if ( out[ j ] !== val ) {
			j++;
			out[ j ] = val;
		}
	}

	// Truncate the array:
	if ( isTypedArrayLike( out ) ) {
		out = out.subarray( 0, j + 1 );
	} else {
		out.length = j + 1;
	}
	return out;

} // end FUNCTION unique()


// EXPORTS //

module.exports = unique;
