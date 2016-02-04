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

function merge(obj) {
    const go = (x, y) => y.length < 1 ? x : extend(x, go(y[0], y.slice(1)));
    return go(obj, [].slice.call(arguments, 1));
}

module.exports = merge(object, choice, profunctor, strong);