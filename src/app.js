const express = require('express');
const dbConnection = require('./config/DatabaseConfig');
const _middlewares = require('./api/v1/middlewares/appMiddlewares');
const logger = require('./api/v1/utils/logger');

// MIDDLEWARES
require('dotenv').config();

const app = express();

const run = async (PORT) => {
    try {
        await dbConnection();
        logger.info(`Db connected successfully`);
        console.log('Db connected successfully');

        _middlewares(app); // This function will load middlewares

        app.listen(PORT, (err) => {
            if (err) return false;
            logger.info(`Server is running at port ${PORT}`);
            console.log(`Server is running at port ${PORT}`);
        });
    } catch (err) {
        logger.error(err.message);
        process.exit(1);
    }
};

module.exports = run;
