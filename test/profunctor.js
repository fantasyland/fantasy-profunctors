'use strict';

const { adapters: { nodeunit: λ } } = require('fantasy-check');
const { isInstanceOf } = require('fantasy-helpers');
const { equals } = require('fantasy-equality');
const { constant } = require('fantasy-combinators');

const environment = require('fantasy-environment');

const f = require('fantasy-land/laws/functor');
const p = require('fantasy-land/laws/profunctor');

const { Profunctor } = require('../fantasy-profunctors');

const env = environment()
    .method('equals', isInstanceOf(Profunctor), (x, y) => equals(x.run(), y.run()));

const λʹ = λ.envAppend(env);

exports.functor = {
    'identity': λʹ.law(f.identity)(x => Profunctor(constant(x))),
    'composition': λʹ.law(f.composition)(x => Profunctor(constant(x)))
};

exports.profunctor = {
    'identity': λʹ.law(p.identity)(x => Profunctor(constant(x))),
    'composition': λʹ.law(p.composition)(x => Profunctor(constant(x)))
};