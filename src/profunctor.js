'use strict';

const {tagged} = require('daggy');
const {identity} = require('fantasy-combinators');

// Function combinators

const dimap = (g, h, f) => a => h(f(g(a)));

const lmap = (g, f) => a => f(g(a));

const map = (g, f) => a => g(f(a));

const arr = f => map(f, identity);

// Function wrapper

const Profunctor = tagged('f');

Profunctor.prototype.dimap = function(f, g) {
    return Profunctor(dimap(f, g, this.f));
};

Profunctor.prototype.map = function(f) {
    return Profunctor(map(f, this.f));
};

module.exports = { Profunctor
                 , dimap
                 , lmap
                 , map
                 , arr 
                 };