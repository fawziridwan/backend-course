const crypto = require("crypto");

const algorithm = "aes-256-cbc";

// 32-byte (256-bit) key and 16-byte IV (must be secret!)
const secretKey = crypto
  .createHash("sha256")
  .update("your-secure-key-here") // Replace with strong secret or load from .env
  .digest();

const iv = Buffer.from("a2xhcgAAAAAAAAAA"); // 16-byte IV — could be randomized per encryption

/**
 * Encrypt plain-text password
 * @param {string} plainText
 * @returns {string} base64 encoded encrypted string
 */
function encryptPassword(plainText) {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(plainText, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

/**
 * Decrypt encrypted password back to plain text
 * @param {string} encryptedText - base64 encoded encrypted string
 * @returns {string} decrypted plain text
 */
function decryptPassword(encryptedText) {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encryptedText, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = {
  encryptPassword,
  decryptPassword,
};
