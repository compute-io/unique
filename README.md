unique
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Removes duplicate values from an array.


## Installation

``` bash
$ npm install compute-unique
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var unique = require( 'compute-unique' );
```

#### unique( arr[, sorted] )

Removes duplicate values from [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) or [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) `arr`.

``` javascript
var data = [ 3, 1, 1, 4, 3, 5 ];

unique( data );
// [ 1, 3, 4, 5 ]
```

The function accepts the following `options`:

*	 __accessor__: accessor `function` for accessing `array` values.
*	 __dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__sorted__: `boolean` indicating if the `array` is already sorted in __ascending__ order. Default: `false`.


If the `array` is already sorted in __ascending__ order, set the `sorted` option to `true`.

```javascript
var sorted = [ 1, 1, 3, 3, 4, 5 ];

unique( sorted, {
	'sorted': true
});
// [ 1, 3, 4, 5 ]
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 3],
	['boop', 1],
	['bip', 1],
	['bap', 4],
	['baz', 3]
	['boz', 5]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = unique( data, {
	'accessor': getValue
});
// [ 1, 3, 4, 5 ]
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), the output date type is the same as the one of the input array. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Int32Array( [3, 1, 1, 4, 3, 5] );

out = unique( data, {
	'dtype': 'int32'
});
// returns Int32Array( [1,3,4,5] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	out,
	bool;

data = [ 3, 1, 1, 4, 3, 5 ];

out = unique( data, {
	'copy': false
});
// returns [ 1, 3, 4, 5]

bool = ( data === out );
// returns true
```

## Examples

``` javascript
var unique = require( 'compute-unique' );

// Simulate some data...
var data = new Array( 1000 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random() * 10 );
}

// Determine the unique values:
unique( data );

console.log( data.join( '\n' ) );
// returns (with high probability) an array of length 11 with values 0:1:10
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

A couple of notes:

1. 	The unique value `array` is sorted in ascending order.
2. 	Computing the unique values for an unsorted `array` is `O(N + N log(N))` and for a sorted `array` is `O(N)`, where `N` is the length of the input `array`.


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-unique.svg
[npm-url]: https://npmjs.org/package/compute-unique

[travis-image]: http://img.shields.io/travis/compute-io/unique/master.svg
[travis-url]: https://travis-ci.org/compute-io/unique

[codecov-image]: https://img.shields.io/codecov/c/github/compute-io/unique/master.svg
[codecov-url]: https://codecov.io/github/compute-io/unique?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/unique.svg
[dependencies-url]: https://david-dm.org/compute-io/unique

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/unique.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/unique

[github-issues-image]: http://img.shields.io/github/issues/compute-io/unique.svg
[github-issues-url]: https://github.com/compute-io/unique/issues
