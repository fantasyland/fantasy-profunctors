'use strict';

const {adapters: {nodeunit: λ}} = require('fantasy-check');
const {isInstanceOf} = require('fantasy-helpers');
const environment = require('fantasy-environment');
const {equals} = require('fantasy-equality');
const {constant} = require('fantasy-combinators');


const {identity, composition} = require('fantasy-land/laws/profunctor');

const {Tagged} = require('../fantasy-profunctors');

const env = environment()
    .method('equals', isInstanceOf(Tagged), (x, y) => equals(x, y));

const λʹ = λ.envAppend(env);

exports.profunctor = {
    'identity': λʹ.law(identity)(Tagged),
    'composition': λʹ.law(composition)(Tagged)
};