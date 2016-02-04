'use strict';

const { tagged } = require('daggy');
const { dimap } = require('fantasy-land');

const Either = require('fantasy-eithers');

const Tagged = tagged('x');

Tagged.prototype[dimap] = function(f, g) {
    return Tagged(g(this.x));
};

Tagged.prototype.left = function() {
    return Tagged(Either.Left(this.x));
};

Tagged.prototype.right = function() {
    return Tagged(Either.Right(this.x));
};

module.exports = Tagged;