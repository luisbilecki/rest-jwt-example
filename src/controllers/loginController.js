const { generateJWT, validateJWT } = require('../services/loginService');

/**
 * In real scenario, we should validate user email and password.
 */
const signIn = (req, res) => {
    // Extracting parameters for POST body
    const { userId, userName, userEmail } = req.body;

    // Storing generated token
    const token = generateJWT({ userId, userEmail, userName });

    // Returning response to user
    res.status(200);
    res.json({
        token: token
    });
};

// Validates JWT payload, signature and expiration time
const validateLogin = async(req, res) => {
    // Extracts JWT token from request body
    const { token } = req.body;
    const result = await validateJWT(token);

    res.status(200);
    res.json(result);
};

module.exports = {
    signIn,
    validateLogin
};
