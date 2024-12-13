const {nanoid} =require('shortid')

const URL= require('../models/index');
const shortid = require('shortid');

async function handleGenerateShortUrl(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error :'url is required'})
    const shortID = shortid(8);
    await URL.create({
        shortId : shortID,
        redirectUrl:body.url,
        visitHistory:[],
    });

    return res.json({ id :shortID})
}

async function handleRedirectToUrl(req,res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory: {
            timestamp: Date.now(),
}}});
    res.redirect(entry.redirectUrl);
    
}

module.exports ={ 
    handleGenerateShortUrl,
    handleRedirectToUrl,
}