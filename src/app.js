const express = require('express')
const dbConnection = require('./config/DatabaseConfig')
const _middlewares = require('./api/v1/middlewares/appMiddlewares')
const logger = require('./api/v1/utils/logger')
const config = require('config')

// MIDDLEWARES
require("dotenv").config();

const app = express()

const run = (PORT) => {
     dbConnection().then(() => {
        console.log('Db connected successfully')
        // this function will load all the app middlewares
        _middlewares(app)

        app.listen(PORT,()=>{ 
            logger.info(`Server is running at port ${PORT}`)
            console.log(`Server is running at port ${config.get('osca_kampala_website_backend.host_url')}}`)
        })

     }).catch((err) => {
        logger.error(err.message)
        process.exit(1)
     })

}

module.exports = run
