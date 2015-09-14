var daggy = require('daggy'),
    combinators = require('fantasy-combinators'),

    Either = require('fantasy-eithers'),
    Tuple2 = require('fantasy-tuples').Tuple2,

    identity = combinators.identity,
    compose  = combinators.compose,
    
    Strong = daggy.tagged('f');

Strong.prototype.first = function() {
    return Tuple2(this.f(x._1), x._2);
};

Strong.prototype.second = function() {
    return this.f.map;
};

Strong.and = function(l, r) {
    return compose(l.first())(r.second());
};

Strong.or = function(l, r) {
    var split = function(x) {
        return x.dimap(identity, function(x) {
            return Tuple2(x, x);
        });
    };
    return compose(split)(String.and(l, r));
};

if (typeof module != 'undefined')
  module.exports = Strong;
