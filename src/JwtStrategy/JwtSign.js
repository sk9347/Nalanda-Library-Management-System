const jwt = require("jsonwebtoken");

const jwtSign = async (id, role) => {
  const token = jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });

  return token;
};

module.exports = { jwtSign };
