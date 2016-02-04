'use strict';

const { identity, compose } = require('fantasy-combinators');
const { dimap, map } = require('fantasy-land');
const { curry, isFunction } = require('fantasy-helpers');

const { lmap } = require('./profunctor');

// Function combinators

const left = x => {
    return isFunction(x.left)
         ? x.left()
         : y => y.bimap(x, identity);
};

const right = x => {
    return isFunction(x.right)
         ? x.right()
         : y => y[map](x);
};

const choice = curry((l, r) => compose(left(l))(right(r)));

const join = curry((l, r) => {
    const map = x => x.fold(identity, identity);
    return compose(choice(l, r))(lmap(map, identity));
});

module.exports = { left
                 , right
                 , choice
                 , join
                 };