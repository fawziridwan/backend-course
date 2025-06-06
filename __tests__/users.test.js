const request = require("supertest");
const app = require("./../index");
const { generateUser } = require("../utils/fake_user");
const user = generateUser();
const getToken = require("../utils/login");

describe("GET /api/v1/admin/users", () => {
  it("GET /api/v1/admin/users with valid token", async () => {
    const token = await getToken();
    const res = await request(app)
      .get("/api/v1/admin/users")
      .set("Authorization", `${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Get all users successfully");
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBeGreaterThan(0);

    const user = res.body.data[0];
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
  });

  it("GET /api/v1/admin/users with invalid token", async () => {
    const token = "invalid_token";
    const res = await request(app)
      .get("/api/v1/admin/users")
      .set("Authorization", `${token}`);
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Invalid token");
    expect(res.body.data).toBeUndefined();
  });

  it("GET /api/v1/admin/users with no token", async () => {
    const res = await request(app).get("/api/v1/admin/users");
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Unauthenticated.");
    expect(res.body.data).toBeUndefined();
  });

  it("GET /api/v1/admin/users/id with valid token", async () => {
    const token = await getToken();
    const id = 101;
    const res = await request(app)
      .get("/api/v1/admin/users/" + id)
      .set("Authorization", `${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Get user by id successfully");
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data).toHaveProperty("name");
    expect(res.body.data).toHaveProperty("email");
  });

  it("GET /api/v1/admin/users/id with invalid token", async () => {
    const token = "invalid_token";
    const id = 101;
    const res = await request(app)
      .get("/api/v1/admin/users/" + id)
      .set("Authorization", `${token}`);
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Invalid token");
    expect(res.body.data).toBeUndefined();
  });

  it("GET /api/v1/admin/users/id with no token", async () => {
    const id = 101;
    const res = await request(app).get("/api/v1/admin/users/" + id);
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Unauthenticated.");
    expect(res.body.data).toBeUndefined();
  });

  it("GET /api/v1/admin/users/id with invalid id", async () => {
    const token = await getToken();
    const id = "invalid";
    const res = await request(app)
      .get("/api/v1/admin/users/" + id)
      .set("Authorization", `${token}`);
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Internal Server Error");
    expect(res.body.data).toBeUndefined();
  });
});
