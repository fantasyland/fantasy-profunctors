var daggy = require('daggy'),
    combinators = require('fantasy-combinators'),

    Either = require('fantasy-eithers'),
    Tuple2 = require('fantasy-tuples').Tuple2,

    compose  = combinators.compose,

    Star = daggy.tagged('f');

Star.prototype.run = function(x) {
    return this.f(x);
};

Star.prototype.diamp = function(f, g) {
    return Star(compose(this.f)(f));
};

Star.prototype.first = function() {
    var self = this;
    return Star(function(t) {
        return Tuple2(self.f(t._1), t_2);
    });
};

Star.prototype.second = function() {
    var self = this;
    return Star(function(t) {
        return Tuple2(t._1, self.f(t._2));
    });
};

Star.prototype.left = function() {
    var self = this;
    return Star(function(x) {
        return x.cata({
            Left: function(y) {
                return Either.Left(self.f(y));
            },
            Right: function(y) {
                return Either.Right(y);
            }
        });
    });
};

Star.prototype.right = function() {
    var self = this;
    return Star(function(x) {
        return x.cata({
            Left: function(y) {
                return Either.Left(y);
            },
            Right: function(y) {
                return Either.Right(self.f(y));
            }
        });
    });
};

if (typeof module != 'undefined')
  module.exports = Star;
