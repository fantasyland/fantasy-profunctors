'use strict';

const {tagged} = require('daggy');
const {compose, identity} = require('fantasy-combinators');

const Either = require('fantasy-eithers');
const {Tuple} = require('fantasy-tuples');

const Strong = tagged('p');

Strong.prototype.first = function() {
    return t => Tuple(this.p(t._1), t._2);
};

Strong.prototype.second = function() {
    return t => this.p.map(t);
};

Strong.both = (x, y) => {
    const first = Strong(x).first();
    const right = Strong(y).second();
    return compose(first)(second);
};

Strong.split = (l, r) => {
    const profunctor = Profunctor(identity);
    const strong = both(l, r);
    return compose(profunctor.map(x => Tuple(x, x)))(strong);
};

module.exports = Strong;