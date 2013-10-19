/**
 * Module dependencies
 */
var errors = require('./errors');
var config = require('./config');

/**
 * Server constructor.
 * Can be called without keyword new. E.g. var server = Server();
 *
 * @constructor
 * @this {Server} 
 */
 function Server() {
  if (!(this instanceof Server)) return new Server();
  this.transports = [];
  this.domains = [];
  this.crossdomainXML = "";
 }

/**
 * Regexp for arguments checking:
 */ 
var domainNameRegExp = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
var ipRegExp = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
 
 /**
 * Adds new transport for server and starts to listen it.
 *
 * @param {Number} Listening port.
 * @param {String} Listening host: ip address or domain name. Default "0.0.0.0".
 * @param {String} Protocol type. "TCP" or "HTTP". Default "TCP".
 */
 Server.prototype.listen(port, host, type) {
  // Default values for arguments:
  if (!host) host = "0.0.0.0";
  if (!type) type = "TCP";
  
  // Argument checking:
  
  // Port is valid?
  if (port == undefined)            throw new errors.InvalidPort('Listening port is required argument.');
  if (typeof(port) != "number")     throw new errors.InvalidPort('Listening port is not a number: ' + port);
  if (Math.floor(port) != port)     throw new errors.InvalidPort('Listening port is not an integer: ' + port);
  if ((port <= 0)||(port > 65535))  throw new errors.InvalidPort('Listening port is out of range: ' + port);
  
  // Hostname is valid?
  if (typeof(host) !== "string")
    throw new errors.InvalidHostname("Invalid listening hostname or ip address is not a String: " + host);
  if ( !domainNameRegExp.test(host) && !ipRegExp.test(host) && (host != 'localhost') )
    throw new errors.InvalidHostname("Invalid listening hostname or ip address: " + host);
 
  // Type is valid?
  if (config.availableTransports.indexOf(type) == -1) 
    throw new errors.InvalidPort('Unknown type of transport: ' + type);
  
  // Creating new transport server and listening:
  var transportServer = new TransportServer(port, host, type, this);
  this.transports.push( transportServer );
  transportServer.listen();
  
  // Crossdomain issues:
  this.compileCrossdomainXML();
}

/**
 * Adds domain to crossdomain list for Flash Player Crossdomain Policy;
 */
Server.prototype.addDomain( domain ) {
  if ( !domainNameRegExp.test(domain) && !ipRegExp.test(domain) && (domain != 'localhost') && ( domain != '*') )
    throw new errors.InvalidHostname("Invalid listening hostname or ip address: " + domain);
  
  if (domain != '*') {
    if (this.domains[0] != '*' ) 
      this.domains.push( domain );
  } else {
    this.domains = ['*'];
  }
  // Recompile XML:
  this.compileCrossdomainXML();
}

/**
 * Recompiles crossdomain xml for Flash Player Crossdomain Policy with latest lists of ports and domains
 */
Server.prototype.compileCrossdomainXML() {
  var crossDomainStrings = "";
  var ports = [];
    
  for (var i in this.transports) {
    if (this.transports[i].type == "TCP")
      ports.push(this.transports[i].port);
  }
    
  for (var i in this.domains) {
    crossDomainStrings += '<allow-access-from domain="' +  this.domains[i] + '" to-ports="' + ports.join() + '" ' + '/>';    
  }
    
  this.crossdomainXML = "";
  this.crossdomainXML += '<?xml version="1.0" encoding="UTF-8"?>';
  this.crossdomainXML += '<!DOCTYPE cross-domain-policy SYSTEM "/xml/dtds/cross-domain-policy.dtd">';
  this.crossdomainXML += '<cross-domain-policy>';
  this.crossdomainXML += crossDomainStrings;
  this.crossdomainXML += '</cross-domain-policy>';  
}