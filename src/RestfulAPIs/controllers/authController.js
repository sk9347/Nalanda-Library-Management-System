const { jwtSign } = require("../../JwtStrategy/JwtSign");
const User = require("../../models/User");

const register = async (userData) => {
  const { name, email, password, role } = userData;
  const existingUser = await User.findOne({ email });

  if (existingUser) throw new Error("User already exists");

  const user = new User({ name, email, password, role });
  await user.save();

  return { message: "User registered successfully" };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid credentials");
  }

  const token = await jwtSign(user._id, user.role);

  return { token };
};

module.exports = { register, login };
