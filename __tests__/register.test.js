const request = require("supertest");
const app = require("./../index");
const { generateUser } = require("../utils/fake_user");
const user = generateUser();

describe("POST /api/v1/register", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .post("/api/v1/register")
      .send({
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .set("Accept", "application/json");
    const data = response.body;

    expect(response.statusCode).toBe(201);
    expect(data.success).toBe(true);
    expect(data.message).toBe("Register successfully");
    expect(data.data).toHaveProperty("id");
    expect(data.data).toHaveProperty("name");
    expect(data.data).toHaveProperty("email");
    expect(data.data).toHaveProperty("password");
    expect(data.data).toHaveProperty("createdAt");
    expect(data.data).toHaveProperty("updatedAt");
  });

  it("should return 422 - Email Already Exists", async () => {
    const response = await request(app)
      .post("/api/v1/register")
      .send({
        name: "Sydney",
        email: "Clarabelle@yopmail.com",
        password: "bcjZ6ntIO8dP2JD",
      })
      .set("Accept", "application/json");
    const data = response.body;
    const errors = data.errors[0];

    expect(response.statusCode).toBe(422);
    expect(data.success).toBe(false);
    expect(data.message).toBe("Validation error");
    expect(errors.path).toBe("email");
    expect(errors.msg).toBe("Email already exists");
    expect(errors.value).toBe(errors.value);
    expect(errors.location).toBe("body");
  });

  it("should return 422 - Password must be at least 6 characters", async () => {
    const user = generateUser();
    const response = await request(app)
      .post("/api/v1/register")
      .send({
        name: user.name,
        email: user.email,
        password: "P@ss",
      })
      .set("Accept", "application/json");
    const data = response.body;
    const errors = data.errors[0];

    expect(response.statusCode).toBe(422);
    expect(data.success).toBe(false);
    expect(data.message).toBe("Validation error");
    expect(errors.path).toBe("password");
    expect(errors.msg).toBe("Password must be at least 6 characters long");
    expect(errors.value).toBe("P@ss");
    expect(errors.location).toBe("body");
  });
});
