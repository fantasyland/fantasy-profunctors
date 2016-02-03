'use strict';

const {tagged} = require('daggy');
const {compose} = require('fantasy-combinators');
const {Tuple} = require('fantasy-tuples');
const {map} = require('./profunctor');

const Either =  require('fantasy-eithers');

const Star = P => {

    const Star = tagged('run');

    Star.prototype.dimap = function(f, g) {
        return Star(map(g, compose(this.run)(f)));
    };

    Star.prototype.lmap = function(f) {
        return Star(compose(this.run)(f));
    };

    Star.prototype.map = function(f) {
        return Star(map(f, this.run));
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

    return Star;
};

module.exports = Star;