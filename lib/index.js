/**
*
*	COMPUTE: unique
*
*
*	DESCRIPTION:
*		- Removes duplicate values from a numeric array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

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
* FUNCTION: unique( arr, sorted )
*	Removes duplicate values from a numeric array. Note: the input array is mutated.
*
* @param {Array} arr - array to be deduped
* @param {Boolean} sorted - boolean flag indicating if the input array is sorted
*/
function unique( arr, sorted ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'unique()::invalid input argument. First argument must be an array.' );
	}
	if ( arguments.length > 1 && typeof sorted !== 'boolean' ) {
		throw new TypeError( 'unique()::invalid input argument. Second argument must be an array.' );
	}
	var len = arr.length,
		i, j,
		val;

	if ( !sorted ) {
		arr.sort( ascending );
	}
	// Loop through the array, only incrementing a pointer when successive values are different. When a succeeding value is different, move the pointer and set the next value. In the trivial case where all array elements are unique, we incur a slight penalty in resetting the element value for each unique value. In other cases, we simply move a unique value to a new position in the array. The end result is a sorted array with unique values.
	for ( i = 1, j = 0; i < len; i++ ) {
		val = arr[ i ];
		if ( arr[ j ] !== val ) {
			j++;
			arr[ j ] = val;
		}
	}
	// Truncate the array:
	arr.length = j+1;
} // end FUNCTION unique()


// EXPORTS //

module.exports = unique;
