'use strict';

const {tagged} = require('daggy');
const {compose} = require('fantasy-combinators');
const {Tuple} = require('fantasy-tuples');
const Either = require('fantasy-eithers');

const Star = P => {

    const Star = tagged('run');

    Star.prototype.diamp = function(f, g) {
        return Star(x => this.s(f(x)).map(g));
    };

    Star.prototype.first = function() {
        return Star(x => this.run(x._1).map(y => Tuple(y, x._2)));
    };

    Star.prototype.second = function() {
        return Star(x => this.run(x._2).map(y => Tuple(x._1, y)));
    };

    Star.prototype.left = function() {
        return Star(x => x.fold(
            a => this.run(a).map(Either.Left),
            a => P.of(Either.Right(a))
        ));
    };

    Star.prototype.right = function() {
        return Star(x => x.fold(
            a => P.of(Either.Left(a)),
            a => this.run(a).map(Either.Right)
        ));
    };

    Star.prototype.wander = function(t) {
        return Star(a => t(P.of, this.run, a));
    };

    return Star;
};

module.exports = Star;