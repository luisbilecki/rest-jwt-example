const baseURL = 'hello';

const sayHello = {
    method: 'get',
    path: `/${baseURL}/sayHello`,
    name: 'hello - say hello',
    version: 'v1.0.0',
    useWrap: true,
    useAuth: false,
    validations: {},
    handler: (req, res, next) => {
        res.send('hello');
    }
};

module.exports = [
    sayHello
];
