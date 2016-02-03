'use strict';

const {identity, compose} = require('fantasy-combinators');
const {lmap} = require('./profunctor');

const left = f => x => x.bimap(f, identity);

const right = f => x => x.bimap(identity, this.x);

const choice = (l, r) => compose(left(l))(right(r));

const join = (l, r) => {
    const map = x => x.fold(identity, identity);
    return compose(choice(l, r))(lmap(map, identity));
};

module.exports = { left
                 , right
                 , choice
                 , join
                 };