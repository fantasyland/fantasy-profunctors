'use strict';

const daggy = require('daggy');
const {compose} = require('fantasy-combinators');
const {Tuple} = require('fantasy-tuples');
const Either = require('fantasy-eithers');

const Star = daggy.tagged('f');

Star.prototype.run = function(x) {
    return this.f(x);
};

Star.prototype.diamp = function(f, g) {
    return Star(compose(compose(f)(this.f))(g.map));
};

Star.prototype.first = function() {
    return Star((t) => Tuple(this.f(t._1), t_2));
};

Star.prototype.second = function() {
    return Star((t) => Tuple(t._1, this.f(t._2)));
};

Star.prototype.left = function() {
    return Star((x) => {
        return x.fold(
            (y) => Either.Left(this.f(y)),
            (y) => Either.Right(y)
        );
    });
};

Star.prototype.right = function() {
    return Star((x) => {
        return x.fold(
            (y) => Either.Left(y),
            (y) => Either.Right(this.f(y))
        );
    });
};

module.exports = Star;