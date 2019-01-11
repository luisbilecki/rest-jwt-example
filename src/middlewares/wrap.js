const Boom = require('boom');

const sendError = (res, e) => {
    const output = Boom.boomify(e).output;

    res.send(output.statusCode, output.payload);
};

const wrapMiddleware = (f) => {
    return (req, res, next) => {
        (
            async() => {
                try {
                    await f(req, res, next);
                } catch(err) {                    
                    sendError(res, err);
                }
            }
        )();
    };
};

module.exports = wrapMiddleware;
