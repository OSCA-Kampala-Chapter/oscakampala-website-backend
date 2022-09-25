const mongoose = require('mongoose')
const dbUrl = 'mongodb://localhost:27017/oscabackend'

const dbConnection = () => {
   mongoose.Promise = global.Promise
    return mongoose.connect(dbUrl,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
}
module.exports = dbConnection