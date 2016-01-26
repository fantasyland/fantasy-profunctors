'use strict';

const daggy = require('daggy');
const {compose, identity} = require('fantasy-combinators');

const Either = require('fantasy-eithers');
const {Tuple} = require('fantasy-tuples');

const Strong = daggy.tagged('f');

Strong.prototype.first = function(x) {
    return Tuple(this.f(x._1), x._2);
};

Strong.prototype.second = function(x) {
    return x.map(this.f);
};

Strong.andThen = function(x) {
    return compose(x.first)(this.second);
};

Strong.or = function(x) {
    const split = (x) => x.dimap(identity, (x) => Tuple(x, x));
    return compose(split)(Strong.andThen(l, r));
};

module.exports = Strong;