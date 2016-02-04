'use strict';

const { tagged } = require('daggy');
const { dimap, lmap, map } = require('fantasy-land');
const { compose, identity } = require('fantasy-combinators');
const { curry, isFunction } = require('fantasy-helpers');

// Function combinators

const dimapʹ = curry((f, g, x) => {
    return isFunction(x[dimap])
         ? x[dimap](f, g)
         : compose(g)(compose(x)(f));
});

const lmapʹ = curry((f, x) => {
    return isFunction(x[lmap])
         ? x[lmap]()
         : isFunction(x[dimap])
           ? dimapʹ(f, identity, x) 
           : compose(x)(f);
});

const mapʹ = curry((f, x) => {
    return isFunction(x[map])
         ? x[map]()
         : isFunction(x[dimap])
           ? dimap(identity, f, x)
           : compose(f)(x);
});

const arr = f => mapʹ(f, identity);

// Function wrapper

const Profunctor = tagged('run');

Profunctor.prototype[dimap] = function(f, g) {
    return Profunctor(dimapʹ(f, g, this.run));
};

Profunctor.prototype[lmap] = function(f) {
    return Profunctor(lmapʹ(f, this.run));
};

Profunctor.prototype[map] = function(f) {
    return Profunctor(mapʹ(f, this.run));
};

module.exports = { Profunctor
                 , dimap: dimapʹ
                 , lmap: lmapʹ
                 , map: mapʹ
                 , arr 
                 };