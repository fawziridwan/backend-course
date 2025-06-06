// Import express
const express = require("express");

// Import jwt
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get token
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).json({
      statusCode: 401,
      success: false,
      message: "Unauthenticated.",
    });

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: "Invalid token",
      });
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
