const run = require('./app');
const config = require('config');

const PORT = parseInt(
    process.env.PORT || config.get('osca_kampala_website_backend.port')
);

run(PORT);
