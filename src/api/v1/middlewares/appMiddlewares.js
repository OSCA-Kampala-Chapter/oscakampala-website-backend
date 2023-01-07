const express = require('express');
const auth = require('./auth');
var { unless } = require('express-unless');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('../utils/logger');
const compression = require('compression');

const appMiddlewares = (app) => {
    // only use morgan middleware in development
    process.env.NODE_ENV === 'development' &&
        app.use(morgan('tiny', { stream: logger.stream }));

    app.disable('x-powered-by');
    app.use(compression());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // CONFIGURE EXPRESS UNLESS ON ROUTES WHICH DON'T NEED AUTHENTICATION
    auth.authenticateToken.unless = unless;
    app.use(
        auth.authenticateToken.unless({
            path: [
                { url: '/api/v1/users/login', method: ['POST'] },
                { url: '/api/v1/users/register', method: ['POST'] },
            ],
        })
    );

    // REGISTER ROUTES TO EXPRESS
    app.use('/api/v1/users/', require('../../v1/routes/UserRoutes'));
};

module.exports = appMiddlewares;
