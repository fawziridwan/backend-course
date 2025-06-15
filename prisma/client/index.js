const { PrismaClient } = require("@prisma/client");
const { PrismaNeon } = require("@prisma/adapter-neon");
const { dotenv } = require("dotenv");

const prisma = new PrismaClient(
  {
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  },
  new PrismaNeon()
);

prisma.$connect();

module.exports = prisma;
