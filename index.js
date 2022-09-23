/** @format */

const express = require("express");
const app = express();

//middleWare
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//route

app.get("/", (req, res) => {
  res.send("<h1>This is a home route</h1>");
});

app.post("/api/v1/login", (req, res) => {
  console.log(req.body);
  res.status(201)
});

//port
const port = process.env.PORT || 4000;

//server listening

app.listen(port, console.log(`Listening on port: ${port}`));
