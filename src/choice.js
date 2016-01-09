'use strict';

const daggy = require('daggy');
const {identity, compose} = require('fantasy-combinators');

const Either = require('fantasy-eithers');
const Choice = daggy.tagged('f');

Choice.prototype.left = function() {
    return x.cata({
        Left: (a) => Either.Left(this.f(a)),
        Right: Either.Right
    });
};

Choice.prototype.right = function() {
    return this.f.map;
};

Choice.andThen = (l, r) => {
    return compose(l.left)(r.right);
};

Choice.or = (l, r) => {
    const join = (x) => x.fold(identity, identity).dimap(identity, identity);
    return compose(Choice.and(l, r))(join);
};

if (typeof module != 'undefined')
  module.exports = Choice;
