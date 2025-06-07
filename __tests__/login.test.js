// login.test.js
const request = require("supertest");
const express = require("express");

const app = require("./../index");

describe("POST /api/v1/login", () => {
  it("should return 200 and a token for valid credentials", async () => {
    const response = await request(app)
      .post("/api/v1/login")
      .send({
        email: "Clarabelle@yopmail.com",
        password: "bcjZ6ntIO8dP2JD",
      })
      .set("Accept", "application/json");
    const data = response.body;
    expect(response.statusCode).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe("Login successfully");
    expect(data.data).toHaveProperty("user");
    expect(data.data).toHaveProperty("token");
  });

  it("should return 404 for user not found", async () => {
    const response = await request(app)
      .post("/api/v1/login")
      .send({
        email: "invalidemail@yopmail.com",
        password: "bcjZ6ntIO8dP2JD",
      })
      .set("Accept", "application/json");
    const data = response.body;
    expect(response.statusCode).toBe(404);
    expect(data.success).toBe(false);
    expect(data.message).toBe("User not found");
  });

  it("should return 401 for invalid password", async () => {
    const response = await request(app)
      .post("/api/v1/login")
      .send({
        email: "Clarabelle@yopmail.com",
        password: "P@sswo1rd",
      })
      .set("Accept", "application/json");
    const data = response.body;
    expect(response.statusCode).toBe(401);
    expect(data.success).toBe(false);
    expect(data.message).toBe("Invalid password");
  });

  it("should return 500 for internal server error", async () => {
    const response = await request(app)
      .post("/api/v1/login_mock")
      .send({
        email: "Clarabelle@yopmail.com",
        password: "bcjZ6ntIO8dP2JD",
      })
      .set("Accept", "application/json");
    const data = response.body;
    expect(response.statusCode).toBe(500);
    expect(data.success).toBe(false);
    expect(data.message).toBe("Internal server error");
  });
});
