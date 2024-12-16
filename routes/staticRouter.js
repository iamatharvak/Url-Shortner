const express = require('express');
const router = express.Router();
const URL = require("../models/index");

router.get('/', async (req,res)=>{
    const allUrls = await URL.find({});
    return res.render("home",{
        urls:allUrls,
    });
});

module.exports = router;

