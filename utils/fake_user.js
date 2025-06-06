const { faker } = require("@faker-js/faker");

function generateUser() {
  return {
    name: faker.person.firstName(),
    email: `${faker.person.firstName()}@yopmail.com`,
    password: faker.internet.password(10, true, /[A-Z]/, "!"),
  };
}

module.exports = { generateUser };
