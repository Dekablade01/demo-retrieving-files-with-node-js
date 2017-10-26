/**
 * Created by Issarapong Poesua on 10/26/2017 AD.
 */

var express = require("express");
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

var port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.render("index", {
        title: "welcome"
    });
});

app.listen(port, () => {
   console.log(`application is listening on:`, port);
});