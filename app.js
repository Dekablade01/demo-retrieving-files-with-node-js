/**
 * Created by Issarapong Poesua on 10/26/2017 AD.
 */

var express = require("express");
var fs = require("fs");
var path = require('path');
var multer = require("multer");
var bodyParser = require("body-parser");
var uploadPath = "./uploads/"
var app = express();

var port = process.env.PORT || 5000;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get("/", (req, res) => {
    res.render("index", { title: "welcome" });
});


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});

var upload = multer({ storage: storage }).fields


app.post('/uploads', (req, res) => {
    upload(req, res, (err) => {
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath)
        }

        if (err) {
            return res.json(err)
        }

        res.json({ success: true, message: 'Image uploaded!' });

    });
});


app.listen(port, () => {
   console.log("application is listening on:", port);
});

module.exports = app;