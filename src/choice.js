var daggy = require('daggy'),
    combinators = require('fantasy-combinators'),

    Either = require('fantasy-eithers'),
    Tuple2 = require('fantasy-tuples').Tuple2,

    identity = combinators.identity,
    compose  = combinators.compose,

    Choice = daggy.tagged('f');

Choice.prototype.left = function() {
    var self = this;
    return x.cata({
        Left: function(a) {
            return Either.Left(self.f(a));
        },
        Right: function(a) {
            return Either.Right(a);
        }
    });
};

Choice.prototype.right = function() {
    return this.f.map;
};

Choice.and = function(l, r) {
    return compose(l.left)(r.right);
};

Choice.or = function(l, r) {
    var join = function(x) {
        return x.cata({
            Left: identity,
            Right: identity
        }).dimap(identity, identity);
    };
    return compose(join)(Choice.and(l, r));
};

if (typeof module != 'undefined')
  module.exports = Choice;
