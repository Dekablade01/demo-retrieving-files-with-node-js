/**
 * Created by Issarapong Poesua on 10/26/2017 AD.
 */

var express = require("express");
var fs = require("fs");
var path = require('path');
var multer = require("multer");
var uploadPath = "./uploads/"
var app = express();

var port = process.env.PORT || 5000;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get("/", (req, res) => {
    res.render("index", { title: "welcome" });
});


var upload = multer({ dest: uploadPath }).fields([{name: "originsFile"}, {name: "destinationsFile"}]);


app.post("/uploads", upload, (req, res) => {
    upload(req, res, (err) => {
        if (!req.files) {
            res.json({
                status: false,
                message: "No Files"
            });
            return;
        }
        if (err) {
            res.json({
                status: false,
                message: "Failure"
            });
            return;
        }
        res.json({
            success: true,
            message: 'Image uploaded!'
        });


        // Everything went fine
    })
});


app.listen(port, () => {
   console.log("application is listening on:", port);
});

module.exports = app;