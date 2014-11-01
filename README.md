unique
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Removes duplicate values from a numeric array.


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

Removes duplicate values from a numeric `array`. If the `array` is already sorted in __ascending__ order, set the optional second argument to `true`.

``` javascript
var unsorted = [ 3, 1, 1, 4, 3, 5 ],
	sorted = [ 1, 1, 3, 3, 4, 5 ];

unique( unsorted );
// [ 1, 3, 4, 5 ]

unique( sorted, true );
// [ 1, 3, 4, 5 ]
```

Note: the input `array` is mutated. To avoid unwanted mutation of the original `array`,

``` javascript
var copy = unsorted.slice();

unique( copy );
```


## Examples

``` javascript
var unique = require( 'compute-unique' );

// Simulate some data...
var data = new Array( 1000 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*10 );
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

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-unique.svg
[npm-url]: https://npmjs.org/package/compute-unique

[travis-image]: http://img.shields.io/travis/compute-io/unique/master.svg
[travis-url]: https://travis-ci.org/compute-io/unique

[coveralls-image]: https://img.shields.io/coveralls/compute-io/unique/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/unique?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/unique.svg
[dependencies-url]: https://david-dm.org/compute-io/unique

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/unique.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/unique

[github-issues-image]: http://img.shields.io/github/issues/compute-io/unique.svg
[github-issues-url]: https://github.com/compute-io/unique/issues
