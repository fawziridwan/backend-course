const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config;
const bodyParser = require("body-parser");

const app = express();

//import router
const router = require("./routes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//define routes
app.use("/api/v1", router);

app.get("/", async (req, res) => {
  try {
    return res.status(200).send({
      statusCode: 200,
      message: "Api is Running",
      success: true,
    });
  } catch (error) {
    return res.status(404).send({
      statusCode: 404,
      message: "Not Found",
      success: false,
    });
  }
});

// Export the app for local development
if (process.env.NODE_ENV !== "serverless") {
  module.exports = app;
} else {
  module.exports.handler = serverless(app);
}
