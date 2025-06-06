const fs = require("fs");
const path = require("path");

/**
 * Updates .env file with NAME, EMAIL, and PASSWORD from the given data object.
 * @param {{ name?: string, email?: string, password?: string }} data
 * @param {string} [envFileName=".env"]
 */
function updateEnvWithUserData(data, envFileName = ".env") {
  const envPath = path.join(__dirname, "..", envFileName);

  let env = fs.readFileSync(envPath, "utf8").split("\n");

  env = env.map((line) => {
    if (line.startsWith("NAME=")) return `NAME=${data.name || ""}`;
    if (line.startsWith("EMAIL=")) return `EMAIL=${data.email || ""}`;
    if (line.startsWith("PASSWORD=")) return `PASSWORD=${data.password || ""}`;
    return line;
  });

  fs.writeFileSync(envPath, env.join("\n"), "utf8");
}

module.exports = { updateEnvWithUserData };
