const path = require('path'),
    filterFiles = require('filter-files'),
    isDir = require('is-directory'),
    wrapMiddleware = require('../middlewares/wrap'),
    Boom = require('boom'),
    Joi = require('joi');

const { concat, flatten, pick, isArray, isEmpty } = require('lodash');

const dirName = __dirname;

const toArray = (value) => { 
    return isArray(value) ? value : [value];
};

// Check if is valid route faile
const isRouteFile = (fileName) => { 
    return /((routes)|(route))\.js$/.test(fileName);
};

const getRouteFiles = () => {
    return filterFiles.sync(dirName, (fp, dir, /* files, recurse */) => {
        if (isRouteFile(fp)) {
            return true;
        }

        return isDir.sync(path.join(dir, fp));
    }, true);
};

// Load all routes available with pattern .route.js
const loadRoutes = () => {
    const routes = getRouteFiles()
        .map(require);


    return flatten(routes);
};

// Wraps req,res method with middleware to handle erros
const applyWrap = (handlers) => {
    return handlers.map(handler => wrapMiddleware(handler));
};

// Field must be query, body, or params
const applySchemaValidationInHandlers = ({ handlers, schema, field }) => {
    if (!schema) return;

    handlers.push(function(req, res, next) {
        const data = req[field];
        const result = Joi.validate(data, schema);


        if (!result.error) {
            return next();
        }

        const errorOutput = Boom.badRequest(result.error).output;
        res.send(errorOutput.statusCode, errorOutput.payload || errorOutput);
        return next(false);
    });
};

// Get handler for route (with or without middleware)
const getHandlersForRoute = (route) => {
    const { useWrap, validations } = route;
    let handlers = [];

    if (!isEmpty(validations)) {
        // Add a handler to perform JOI validation (body, query and params)
        const { querySchema, bodySchema, paramsSchema } = validations;

        applySchemaValidationInHandlers({ handlers: handlers, schema: querySchema, field: 'query' });
        applySchemaValidationInHandlers({ handlers: handlers, schema: bodySchema, field: 'body' });
        applySchemaValidationInHandlers({ handlers: handlers, schema: paramsSchema, field: 'params' });
    }

    // Add common routes
    handlers = concat(handlers, toArray(route.handler));

    // Wrap request/response with try catch
    if (useWrap) {
        handlers = applyWrap(handlers);
    }

    return handlers;
};

// Register loaded routes in restify server instance
const registerRoutes = (server) => {
    const routes = loadRoutes();

    routes.forEach(route => {
        const { method } = route;
        const opts = pick(route, ['path', 'name', 'version']);

        server[method](opts, getHandlersForRoute(route));
    });
};

// Get routes that don't need authentication
const publicRoutes = () => {
    return loadRoutes()
        .filter(route => !route.useAuth)
        .map(route => route.path);
};

module.exports = {
    registerRoutes,
    publicRoutes,
};
