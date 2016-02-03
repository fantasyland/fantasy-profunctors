'use strict';

const Identity = require('fantasy-identities');

const wander = (t, p) => s => t(Identity, a => Identity(p(a)), s).x;

module.exports = wander;