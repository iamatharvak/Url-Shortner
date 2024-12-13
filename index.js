const express = require("express")
const {connectToMongoDb} = require('./connect')
const app =express();
const Port = 8001;
const urlRoute = require('./routes/url');
// const URL = require('./models/index')

connectToMongoDb("mongodb://localhost:27017/short-url")
.then(()=> console.log("MongoDbConnected"))
.catch(()=> console.log("error in connection with MongoDb"))

app.use(express.json());

app.use('/url',urlRoute);
app.get('/:shortId',urlRoute);


// app.get('/:shortId', async (req,res)=>{
//     const shortId = req.params.shortId;
//     const entry = await URL.findOneAndUpdate({
//         shortId
//     },{$push:{
//         visitHistory: {
//             timestamp: Date.now(),
// }}});
//     res.redirect(entry.redirectUrl);
// })

app.listen(Port,()=>console.log(`Server Started at Port ${Port}`))