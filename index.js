const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config;
const bodyParser = require("body-parser");
const app = express();

//import router
const router = require("./routes");
const { Pool, neonConfig } = require("@neondatabase/serverless");
const ws = require("ws");

neonConfig.webSocketConstructor = ws;

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//define routes
app.use("/api/v1", router);

app.get("/", async (req, res) => {
  const client = await pool.connect();

  // try {
  return res.status(200).send({
    statusCode: 200,
    message: "Api is Running",
    success: true,
  });
  // } catch (error) {
  //   return res.status(404).send({
  //     statusCode: 404,
  //     message: "Not Found",
  //     success: false,
  //   });
  // } finally {
  //   client.release();
  // }

  // try {
  // const result = await client.query("SELECT * FROM users");

  //   res.status(200).json({
  //     statusCode: 200,
  //     message: "Success",
  //     success: true,
  //     data: result.rows,
  //   });

  // } catch (error) {
  //   console.log(error);
  // } finally {
  //   client.release();
  // }

  // res.status(404).json({
  //   statusCode: 404,
  //   message: "Not Found",
  //   success: false,
  // });
});

module.exports = app;
