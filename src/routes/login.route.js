const baseURL = 'login';
const LoginController = require('../controllers/loginController');
const { signInSchema, validateLoginSchema } = require('../schemas/loginSchema');

const signIn = {
    method: 'post',
    path: `/${baseURL}/signIn`,
    name: 'login - sign in',
    version: 'v1.0.0',
    useWrap: true,
    useAuth: false,
    validations: {
        bodySchema: signInSchema
    },
    handler: LoginController.signIn
};

const validateToken = {
    method: 'post',
    path: `/${baseURL}/validateToken`,
    name: 'login - validate token',
    version: 'v1.0.0',
    useWrap: true,
    useAuth: false,
    validations: {
        bodySchema: validateLoginSchema
    },
    handler: LoginController.validateLogin
};

module.exports = [
    signIn,
    validateToken
];
