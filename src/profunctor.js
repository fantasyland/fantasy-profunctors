'use strict';

const daggy = require('daggy');
const {compose, identity} = require('fantasy-combinators');
const Profunctor = daggy.tagged('p');

Profunctor.prototype.dimap = function(f, g) {
    return compose(compose(g)(this.p))(f);
};

Profunctor.prototype.lmap = function(f) {
    return this.dimap(f, identity);
};

Profunctor.prototype.map = function(f) {
    return this.dimap(identity, f);
};

Profunctor.prototype.arr = function(f) {
    return this.map(f);
};

module.exports = Profunctor;