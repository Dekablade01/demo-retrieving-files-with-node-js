var fs = require('fs');
var csv = require('fast-csv');
var modelCreater = require("./model");

var readFile = (fileName, callback) => {
    var stream = fs.createReadStream(fileName, {encoding: "utf8"});
    var objects = [];
    var columnName = [];
    var isColumn = true;
    var csvStream = csv
    .parse()
    .on("data", function(data){ // Finished one row
        var object =  modelCreater.createLocationObject(data[0], data[1], data[2], data[3], data[4], data[5])
        objects.push(object); 
    })
    .on("end", function(){ // Finished all 
        objects.shift();
         callback(objects);
    });
    stream.pipe(csvStream);
}

module.exports = { readFile };