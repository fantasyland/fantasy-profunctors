'use strict';

const {left, right, choice, join} = require('../fantasy-profunctors');
const {identity} = require('fantasy-combinators');
const Either = require('fantasy-eithers');

const toUpper = x => x.toUpperCase();
const add = y => x => x + y;


console.log('#left', left(toUpper)(Either.Left('left')));                // => Either.Left('LEFT')
console.log('#right', left(toUpper)(Either.Right('right')));             // => Either.Right('right')
console.log('#left', right(toUpper)(Either.Left('left')));               // => Either.Left('left')
console.log('#right', right(toUpper)(Either.Right('right')));            // => Either.Right('RIGHT')
console.log('#choice', choice(toUpper, toUpper)(Either.Left('left')));   // => Either.Left('LEFT')
console.log('#choice', choice(toUpper, toUpper)(Either.Right('right'))); // => Either.Right('RIGHT')
console.log('#join', join(toUpper, add('___'))(Either.Left('left')));    // => 'LEFT'
console.log('#join', join(toUpper, add('___'))(Either.Right('right')));  // => 'right__'
