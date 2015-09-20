var daggy = require('daggy'),

    combinators = require('fantasy-combinators'),

    compose  = combinators.compose,
    identity = combinators.identity,

    Profunctor = daggy.tagged('f');

Profunctor.prototype.dimap = function(g, h) {
    return compose(h)(this.f)(g);
};

Profunctor.prototype.lmap = function(f) {
    return this.dimap(f, identity);
}

Profunctor.prototype.rmap = function(f) {
    return this.dimap(identity, f);
}

Profunctor.prototype.arr = function(f) {
    return this.rmap(f);
}

if (typeof module != 'undefined')
  module.exports = Profunctor;
