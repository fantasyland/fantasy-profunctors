var combinators = require('fantasy-combinators'),
    identity    = combinators.identity;

function lmap(f, x) {
    return x.dimap(f, identity);
}

function rmap(f, x) {
    return x.dimap(identity, f);
}

function arr(f, x) {
    return rmap(f, x);
}

if (typeof module != 'undefined')
  module.exports = {
    lmap: lmap,
    rmap: rmap,
    arr : arr
  };