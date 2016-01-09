'use strict';

const {Profunctor} = require('../fantasy-profunctors');
const {identity} = require('fantasy-combinators');

const p = Profunctor(identity);
console.log(p.dimap(identity, identity)(1));
