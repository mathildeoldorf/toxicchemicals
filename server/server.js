const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const config = require("config");

const app = express();
const port = process.env.PORT || 9090;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = app.listen(port, (error) => {
  if (error) {
    console.log("Error running express", error);
  }
  console.log("The server is running on port", server.address().port);
});
