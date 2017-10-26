/**
 * Created by Issarapong Poesua on 10/26/2017 AD.
 */

var express = require("express");
var router = express.Router();
var fs = require("fs");
var uploadPath = "./uploads/"

var multer = require("multer");

router.use(multer);

var storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, uploadPath) },
    filename: (req, file, cb) => { cb(null, file.fieldname + '-' + Date.now()) }
})

var upload = multer({ storage: storage });
var cpUpload = upload.fields( {name:"originsFile"}, {name: "destinationsFie"} )
router.post("/", (req, res) => {
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath)
    }
    console.log("?");
    cpUpload(req, res, (error) => {
        console.log(req)
        if (error) {
            return router.json({
                status: false,
                message: "uploading error"
            })
        }
        console.log("hello");
    })
    console.log("post");
});
module.exports = router;