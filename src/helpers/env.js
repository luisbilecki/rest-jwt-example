const bool = (key) => {
    const value = ('' + process.env[key]).trim().toLowerCase();

    return /true|t|1|y|yes/.test(value);
};

const isTest = () => { 
    return process.env.NODE_ENV === 'test';
};

const isDev = () => { 
    return process.env.NODE_ENV === 'development'; 
};

const isProduction = () => { 
    return process.env.NODE_ENV === 'production';
};

module.exports = {
    bool,
    isTest,
    isDev,
    isProduction,
};
