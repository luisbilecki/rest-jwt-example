const fs = require('fs');
const jwt = require('jsonwebtoken');

// Constants used in JWT sign process
const JWT_AUDIENCE = process.env.JWT_AUDIENCE;
const JWT_ISSUER = process.env.JWT_ISSUER;

const loadPrivateKey = () => {
    const keyFile = process.env.SECRET_KEY_FILE || './secret.key';

    return fs.readFileSync(keyFile);
};

const loadPublicKey = () => {
    const keyFile = process.env.PUBLIC_KEY_FILE || './public.key';

    return fs.readFileSync(keyFile);
};

// Generates a JWT Token using our key pairs
const generateJWT = ({ userId, userEmail, userName, expiresIn = '1h' }) => {
    const signOptions = {
        issuer: JWT_ISSUER, // identifier of the server or system issuing the token
        subject: userEmail, // username or email
        audience: JWT_AUDIENCE, // typically a dns name or user pool id (cognito, auth0)
        expiresIn: expiresIn, // expiration time
        algorithm: 'RS256' // algorithm used to sign
    };
    const privateKey = loadPrivateKey();

    return jwt.sign({ userId, userName }, privateKey, signOptions);
};

// Validate a JWT Token issuer, audience, signature and expiration
const validateJWT = async(jwtToken) => {
    try {
        const publicKey = loadPublicKey();
        const verifyOptions = {
            audience: JWT_AUDIENCE,
            issuer: JWT_ISSUER
        };

        await jwt.verify(jwtToken, publicKey, verifyOptions);

        return { status: 'valid' };
    } catch(err) {
        return { 
            status: 'invalid', 
            name: err.name, 
            message: err.message 
        };
    }
};

module.exports = {
    generateJWT,
    validateJWT,
};
