const TestController = require('../controllers/testController');

const publicRoute = {
    method: 'get',
    path: '/public',
    name: 'public route',
    version: 'v1.0.0',
    useWrap: false,
    useAuth: false,
    validations: {},
    handler: TestController.publicRoute,
};

const privateRoute = {
    method: 'get',
    path: '/private',
    name: 'private route',
    version: 'v1.0.0',
    useWrap: false,
    useAuth: true,
    validations: {},
    handler: TestController.privateRoute,
};

module.exports = [
    publicRoute,
    privateRoute
];
