// Load env variables
require('dotenv-flow').config();

// Load required packages
const restify = require('restify'),
    corsMiddleware = require('restify-cors-middleware'),
    xss = require('xss-clean'),
    routes = require('./src/routes'),
    PORT = process.env.PORT || 8000;

// Create restify server instance
const server = restify.createServer({
    name: require('./package.json').name,
    version: require('./package.json').version
});

// Restify plugins
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Set default content-type for every route
server.use(function(req, res, next){
    res.setHeader('content-type','application/json');

    next();
});

// Cors for restify
// In production, we never use * and * for origins and allowHeaders
const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['*'],   
});

server.pre(cors.preflight);
server.use(cors.actual);

// Authentication
// TODO: JWT

// Sanitizing user inputs
server.use(xss());

// Registering restify routes
routes.registerRoutes(server);

server.listen(PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
});

// Exports server for testing purposes
module.exports = server;
