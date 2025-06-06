const request = require("supertest");
const app = require("../index"); // adjust as needed

async function getToken() {
  const response = await request(app)
    .post("/api/v1/login")
    .send({
      email: `${process.env.EMAIL}`,
      password: `${process.env.PASSWORD}`,
    })
    .set("Accept", "application/json");

  token = response.body.data.token;

  return token;
}

module.exports = getToken;
