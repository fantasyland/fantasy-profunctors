'use strict';

const { compose, identity } = require('fantasy-combinators');
const { map } = require('fantasy-land');
const { curry, isFunction } = require('fantasy-helpers');
const { Tuple } = require('fantasy-tuples');

const { map: mapʹ } = require('./profunctor');

// Function combinators

const first = x => {
    return isFunction(x.first) 
         ? x.first() 
         : y => Tuple(x(y._1), y._2);
};

const second = x => {
    return isFunction(x.second)
         ? x.second()
         : y => y[map](x);
};

const both = curry((x, y) => compose(first(x), second(y)));

const split = curry((l, r) => compose(mapʹ(a => Tuple(a, a), identity), both(l, r)));

module.exports = { first
                 , second
                 , both
                 , split
                 };