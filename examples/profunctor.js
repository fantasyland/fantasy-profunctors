var profunctor = require('../fantasy-profunctors'),
    combinators = require('fantasy-combinators'),

    identity = combinators.identity,

    Profunctor = profunctor.Profunctor;

(function() {
    var p = Profunctor(function(x) {
        return x;
    });

    console.log(p.dimap(identity, identity)(1));
})();