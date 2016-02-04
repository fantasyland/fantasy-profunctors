'use strict';

const { tagged } = require('daggy');
const { compose } = require('fantasy-combinators');
const { of, dimap, lmap, map } = require('fantasy-land');
const { Tuple } = require('fantasy-tuples');
const { map: mapʹ } = require('./profunctor');

const Either =  require('fantasy-eithers');

const Star = M => {

    const Star = tagged('run');

    Star.prototype[dimap] = function(f, g) {
        return Star(mapʹ(g, compose(this.run)(f)));
    };

    Star.prototype[lmap] = function(f) {
        return Star(compose(this.run)(f));
    };

    Star.prototype[map] = function(f) {
        return Star(mapʹ(f, this.run));
    };

    Star.prototype.first = function() {
        return Star(x => this.run(x._1)[map](y => Tuple(y, x._2)));
    };

    Star.prototype.second = function() {
        return Star(x => this.run(x._2)[map](y => Tuple(x._1, y)));
    };

    Star.prototype.left = function() {
        return Star(x => x.fold(
            a => this.run(a)[map](Either.Left),
            a => M[of](Either.Right(a))
        ));
    };

    Star.prototype.right = function() {
        return Star(x => x.fold(
            a => M[of](Either.Left(a)),
            a => this.run(a)[map](Either.Right)
        ));
    };

    return Star;
};

module.exports = Star;