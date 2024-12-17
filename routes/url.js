const express = require('express');

const {handleGenerateShortUrl,handleRedirectToUrl} = require("../controllers/url");

const router = express.Router();

router.post('/',handleGenerateShortUrl);
router.get('/:shortId',handleRedirectToUrl);

module.exports = router;