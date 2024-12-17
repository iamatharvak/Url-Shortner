const express = require("express");
const path = require("path");
const { connectToMongoDb } = require("./connect");
const app = express();
const Port = 8001;
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter")
const URL = require("./models/index");

connectToMongoDb("mongodb://localhost:27017/short-url")
  .then(() => console.log("MongoDbConnected"))
  .catch(() => console.log("error in connection with MongoDb"));

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
//ejs basically html files

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home",{
        urls : allUrls,
});
});

// app.use("/url", urlRoute);
app.use("/",staticRoute);
app.get("/:shortId", urlRoute);



app.listen(Port, () => console.log(`Server Started at Port ${Port}`));
