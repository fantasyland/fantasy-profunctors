const Choice     = require('./src/choice');
const Profunctor = require('./src/profunctor');
const Star       = require('./src/star');
const Strong     = require('./src/strong');

if (typeof module != 'undefined')
    module.exports = { Choice, Profunctor, Star, Strong };
