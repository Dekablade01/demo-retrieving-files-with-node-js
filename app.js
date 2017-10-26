/**
 * Created by Issarapong Poesua on 10/26/2017 AD.
 */

var express = require("express");
var fs = require("fs");

var app = express();

var port = process.env.PORT || 5000;

var uploadRouter = require("./routes/upload");

app.set('views', './views');
app.set('view engine', 'jade');

app.get("/", (req, res) => {
    res.render("index", { title: "welcome" });
});

app.use("/uploads", uploadRouter);


app.listen(port, () => {
   console.log("application is listening on:", port);
});