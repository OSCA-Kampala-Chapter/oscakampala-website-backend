const express = require('express');
const app = express();


//middleWare
app.use(express.json());

//port
const port = process.env.PORT || 3000;

//server listening

app.listen(port,console.log(`Listening on port: ${port}`));