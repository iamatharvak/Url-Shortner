// const sessionIdtoUserMap = new Map();

const jwt = require("jsonwebtoken");
const secret = "Atharva@123";

function setUser(user) {
  // const payload = {
  //     id,
  //     ...user,
  // };
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  );
}

function getUser(token) {
  // return sessionIdtoUserMap.get(id);
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
