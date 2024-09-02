// src/utils/verifyToken.js
const jwt = require("jsonwebtoken");

const verifyToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided, authorization denied");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; 
  } catch (err) {
    throw new Error("Token is not valid");
  }
};

module.exports = verifyToken;
