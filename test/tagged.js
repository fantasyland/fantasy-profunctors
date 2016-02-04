'use strict';

const { adapters: { nodeunit: λ } } = require('fantasy-check');
const { constant } = require('fantasy-combinators');

const { identity, composition } = require('fantasy-land/laws/profunctor');

const { Tagged } = require('../fantasy-profunctors');

exports.profunctor = {
    'identity': λ.law(identity)(Tagged),
    'composition': λ.law(composition)(Tagged)
};