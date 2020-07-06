const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const routes = require(path.join(__dirname, "routes", "routes.js"));

const cors = require("cors");
const config = require("config");
const { dirname } = require("path");

const app = express();
const port = process.env.PORT || 9090;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(routes);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js');
const knex = Knex(knexFile.development);
// Give the knex instance to objection
Model.knex(knex);

const server = app.listen(port, (error) => {
  if (error) {
    console.log("Error running express", error);
  }
  console.log("The server is running on port", server.address().port);
});
