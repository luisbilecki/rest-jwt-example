const publicRoute = (req, res) => {
    res.send('public route');
};

const privateRoute = (req, res) => {
    res.send('private route');
};

module.exports = {
    publicRoute,
    privateRoute,
};
