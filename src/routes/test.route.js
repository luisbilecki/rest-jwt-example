const publicRoute = {
    method: 'get',
    path: '/public',
    name: 'public route',
    version: 'v1.0.0',
    useWrap: false,
    useAuth: false,
    validations: {},
    handler: (req, res) => { 
        res.send('public route'); 
    }
};

const privateRoute = {
    method: 'get',
    path: '/private',
    name: 'private route',
    version: 'v1.0.0',
    useWrap: false,
    useAuth: true,
    validations: {},
    handler: (req, res) => { 
        res.send('private route'); 
    }
};

module.exports = [
    publicRoute,
    privateRoute
];
