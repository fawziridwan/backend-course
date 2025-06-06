const httpMocks = require("node-mocks-http");

const req = httpMocks.createRequest({
  method: "POST",
  url: "/api/v1/login_mock",
  body: { email: "dummy@yopmail.com", password: "dummy" },
  headers: { "Content-Type": "application/json" },
});

const res = httpMocks.createResponse();