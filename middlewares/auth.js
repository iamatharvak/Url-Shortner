const { getUser } = require("../service/auth");

// async function restrictToLoggedinUserOnly(req, res, next) {
//   const userUid = req.headers["authorization"];
//   // console.log(req.headers);
//   //   console.log(req);
//   //   console.log(req.cookies.uid)
//   if (!userUid) return res.redirect("/login");
//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);
//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// async function checkauth(req, res, next) {
//   console.log("header1", req.headers);
//   const userUid = req.headers["authorization"];
//   console.log(userUid);
//   const token = userUid.split("Bearer")[1];
//   const user = getUser(token);

//   req.user = user;
//   next();
// }

function checkforAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) return next();
  // const authorizationHeaderValue = req.headers["authorization"]
  // req.user = null;

  // if(!authorizationHeaderValue) return next();

  // if(!authorizationHeaderValue.startsWith("Bearer")) return next();

  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  return next();
}

function restrictTo(roles = [""]) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("Unauthorized");
    return next();
  };
}

module.exports = {
  // restrictToLoggedinUserOnly,
  // checkauth,
  checkforAuthentication,
  restrictTo,
};
