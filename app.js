/**
 * Created by Issarapong Poesua on 10/26/2017 AD.
 */

var express = require("express");
var fs = require("fs");
var path = require('path');
var multer = require("multer");
var bodyParser = require("body-parser");
var uploadPath = "./";

var distanceCalculator = require("./DistanceCalculator");

var fileNames = [];

var app = express();

var port = process.env.PORT || 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())


app.get("/", (req, res) => {
    res.render("index", { title: "welcome" });
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        let fileName = file.fieldname + '-' + Date.now()+ '.' +extension;
        fileNames.push(file.originalname);
        cb(null, file.originalname);
    }
})

var upload = multer({ storage: storage }).fields([{name: "originsFile"}, {name: "destinationsFile"}]);

app.post("/uploads", upload, (req, res) => {

    if (!req.body) {
        res.json({
            status: false,
            message: "No Body"
        })
    }
    console.log(req.file)
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

        distanceCalculator(fileNames[0], fileNames[1], (isLastRow) => {
            console.log(isLastRow);

            if (isLastRow) {
                res.download(__dirname + "/distance.csv");
            }
        });



    })
});


app.listen(port, () => {
   console.log("application is listening on:", port);
});

