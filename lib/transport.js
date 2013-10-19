/**
 * Module dependencies
 */
var errors = require('./errors');
var config = require('./config');

/**
 * Module exports
 */
module.exports.TransportServer = TransportServer;

/**
 * Creates new object of TransportServer class.
 *
 * @constructor
 * @param {Number} Listening port.
 * @param {String} Listening hostname or ip address.
 * @param {String} Type of transport.
 * @param {Server} Parent server.
 * @this {TransportServer}
 */
function TransportServer(port, host, type, parent) {
  this.port   = port;
  this.host   = host;
  this.type   = type;
  this.parent = parent;
}

TransportServer.prototype.listen = function() {

}