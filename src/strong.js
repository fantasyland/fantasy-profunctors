'use strict';

const {tagged} = require('daggy');
const {compose, identity} = require('fantasy-combinators');
const {map} = require('./profunctor');

const {Tuple} = require('fantasy-tuples');

const first = p => t => Tuple(p(t._1), t._2);

const second = p => t => t.map(p);

const both = (x, y) => compose(first(x), second(y));

const split = (l, r) => map(a => Tuple(a, a), both(l, r));

module.exports = { first
                 , second
                 , both
                 , split
                 };