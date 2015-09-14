var Choice     = require('./src/choice'),
    Profunctor = require('./src/profunctor'),
    Star       = require('./src/star'),
    Strong     = require('./src/strong');

if (typeof module != 'undefined')
    module.exports = {
        Choice    : Choice,
        Profunctor: Profunctor,
        Star      : Star,
        Strong    : Strong
    };
