/**
 * Module dependencies
 */
var util = require('util');

/**
 * Module exports
 */
module.exports.InvalidPort      = InvalidPortError;
module.exports.InvalidHostname  = InvalidHostnameError;
module.exports.UnknownTransport = UnknownTransportError;

/**
 * Abstract error.
 *
 * @constructor
 * @extends Error
 * @param {String} Message of a error.
 * @param {Function}  If defined, pass the constructor property to V8's captureStackTrace to clean up the output.
 * @this {AbstractError} 
 */
var AbstractError = function (msg, constructor) {
  Error.captureStackTrace(this, constructor || this);
  this.message = msg || 'Error'
}
util.inherits(AbstractError, Error);
// Give Abstract error a name property. Helpful for logging the error later.
AbstractError.prototype.name = 'Abstract Error';

/**
 * Invalid port error. Port is not a number, not integer, or out of port range.
 *
 * @constructor
 * @extends AbstractError
 * @param {String} Message of a error.
 * @this {InvalidPortError} 
 */
var InvalidPortError = function (msg) {
  InvalidPortError.super_.call(this, msg, this.constructor)
}
util.inherits(InvalidPortError, AbstractError);
InvalidPortError.prototype.message = 'Port number is invalid.';

/**
 * Invalid hostname error. Hostname is not valid ip or domain name.
 *
 * @constructor
 * @extends AbstractError
 * @param {String} Message of a error.
 * @this {InvalidHostnameError} 
 */
var InvalidHostnameError = function (msg) {
  InvalidHostnameError.super_.call(this, msg, this.constructor)
}
util.inherits(InvalidHostnameError, AbstractError);
InvalidHostnameError.prototype.message = 'Hostname is invalid.';

/**
 * Unknown type of transport server error. 
 *
 * @constructor
 * @extends AbstractError
 * @param {String} Message of a error.
 * @this {Error} 
 */
var UnknownTransportError = function (msg) {
  UnknownTransportError.super_.call(this, msg, this.constructor)
}
util.inherits(UnknownTransportError, AbstractError);
UnknownTransportError.prototype.message = 'Transport is unknown.';