const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.headers["authorization"];
  // console.log(req.headers);
  //   console.log(req);
  //   console.log(req.cookies.uid)
  // console.log(req.headers);
  if (!userUid) return res.redirect("/login");
  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkauth(req, res, next) {
  console.log("header1", req.headers);
  const userUid = req.headers["authorization"];
  console.log(userUid.split("Bearer")[1]);
  const token = userUid.split("Bearer")[1];
  const user = getUser(token);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkauth,
};
