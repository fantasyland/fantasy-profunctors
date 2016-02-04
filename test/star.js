'use strict';

const {adapters: {nodeunit: λ}} = require('fantasy-check');
const {isInstanceOf} = require('fantasy-helpers');
const environment = require('fantasy-environment');
const {equals} = require('fantasy-equality');
const {identity: id, constant} = require('fantasy-combinators');

const Identity = require('fantasy-identities');

const f = require('fantasy-land/laws/functor');
const p = require('fantasy-land/laws/profunctor');

const {Star} = require('../fantasy-profunctors');
const Starʹ = Star(Identity);

const env = environment()
    .method('equals', isInstanceOf(Starʹ), (x, y) => {
        return equals(x.run(), y.run());
    });

const λʹ = λ.envAppend(env);

exports.functor = {
    'identity': λʹ.law(f.identity)(x => Starʹ(constant(x))),
    'composition': λʹ.law(f.composition)(x => Starʹ(constant(x)))
};

exports.profunctor = {
    'identity': λʹ.law(p.identity)(x => Starʹ(constant(x))),
    'composition': λʹ.law(p.composition)(x => Starʹ(constant(x)))
};