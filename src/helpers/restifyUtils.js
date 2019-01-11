const bearerToken = require('bearer-token');

const getJwtToken = (req) => {
    return new Promise((resolve, reject) => {
        return bearerToken(req, (err, token) => {
            if (err) {
                return reject(err);
            }
            
            return resolve(token);
        });
    });
};

module.exports = {
    getJwtToken
};
