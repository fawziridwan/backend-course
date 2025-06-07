const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

//import router
const router = require("./routes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//define routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).send("Health Check");
});

module.exports = app;