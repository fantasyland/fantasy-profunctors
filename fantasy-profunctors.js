const choice = require('./src/choice');
const profunctor = require('./src/profunctor');
const strong = require('./src/strong');
const wander = require('./src/wander');

const Star = require('./src/star');
const Tagged = require('./src/tagged');

const {extend} = require('fantasy-helpers');

const object = { Star
               , Tagged
               }; 

module.exports = extend(extend(extend(object, choice), profunctor), strong);