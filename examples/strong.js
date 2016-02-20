'use strict';

const {first, second, both, split} = require('../fantasy-profunctors');
const {identity} = require('fantasy-combinators');
const {Tuple} = require('fantasy-tuples');

const toUpper = x => x.toUpperCase();
const add = y => x => x + y;


console.log('#first', first(toUpper)(Tuple('first', 'second')));        // => Tuple('FIRST', 'second')
console.log('#second', second(toUpper)(Tuple('first', 'second')));      // => Tuple('first', 'SECOND')
console.log('#both', both(toUpper, toUpper)(Tuple('first', 'second'))); // => Tuple('FIRST', 'SECOND')
console.log('#split', split(toUpper, add('___'))('first'));             // => Tuple('FIRST', 'first___')
