const express = require("express");
const router = express.Router();
const URL = require("../models/index");
const { restrictTo } = require("../middlewares/auth");

router.get("/", restrictTo(["NORMAL"]), async (req, res) => {
  const allUrls = await URL.find({ createdBy: req?.user?._id });
  return res.render("home", {
    urls: allUrls,
  });
});
router.get("/admin/urls", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
