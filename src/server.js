const run = require('./app')
const config = require('config')
const server = require('express')()


const PORT = process.env.PORT || 
     config.get('osca_kampala_website_backend.port')


run(PORT)




