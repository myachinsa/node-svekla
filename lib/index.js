/**
 * Module dependencies
 */
var server = require('./server');
var client = require('./client');

/**
 * Module exports
 */
module.exports.createServer = server.createServer;
module.exports.Server = server.Server;
module.exports.Client = client;