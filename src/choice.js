'use strict';

const daggy = require('daggy');
const {identity, compose} = require('fantasy-combinators');

const Either = require('fantasy-eithers');
const Choice = daggy.tagged('x');

Choice.prototype.left = function() {
    return x => x.bimap(this.x, identity);
};

Choice.prototype.right = function() {
    return x => x.bimap(identity, this.x);
};

Choice.from = (l, r) => {
    const left = Choice(l).left();
    const right = Choice(r).right();
    return compose(left)(right);
};

Choice.join = (l, r) => {
    const choice = Choice.from(l, r);
    const profunctor = Profunctor(identity);
    return compose(choice)(profunctor.lmap(x => x.fold(identity, identity)))
};

module.exports = Choice;