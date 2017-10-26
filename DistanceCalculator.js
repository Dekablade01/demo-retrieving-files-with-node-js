var fs = require("fs");
var modelCreator = require("./model");
var distanceCalculator = require("./LatLongToDistance");
var csvReader = require("./LocationCSVReader");

var bases = [];
var demands = [];

var operations = [];

var baseFileName = ""
var demandFileName = ""
var outPutFileName = "distance.csv"
var demandsOfBase = [];

var callback;

var start = (receivedBasesFileName, receivedDemandsFileName, completion) => {
    baseFileName = receivedBasesFileName;
    console.log("set baseFile with name:", baseFileName);
    demandFileName = receivedDemandsFileName;
    console.log("set demands with name:", demandFileName);

    fs.unlink(outPutFileName,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
   });  
    readFile(true, (locations) => {
        if (bases.length != 0 && demands.length != 0) {            
            afterReceive()
        }
    });
    readFile(false, (locations) => {
        if (bases.length != 0 && demands.length != 0) {
            afterReceive()
        }
    });
    callback = completion;
};


function readFile(isBase, completion) {
    var fileName = isBase ? baseFileName : demandFileName;
    if (fs.existsSync(fileName)) {
        csvReader.readFile(fileName,  (locations) => {
            if (isBase) {
                bases = locations;                
                completion(locations);            
            } else {
                
                demands = locations;
                completion(locations);            
            }
        }); 
    }
    else {
        console.log("not found:", fileName)
    }
}

var afterReceive = () => {
    console.log("base:", bases.length);
    console.log("demands:", demands.length);

    demandsOfBase.push([])
    for (var i = 0; i < bases.length; i++){ 
        demandsOfBase[0].push(`J${i+1}`)
    }
    
    for (var i = 0; i < demands.length; i++) {
        demandsOfBase.push([]);
        for (var j = 0; j < bases.length; j++) {
            var base = bases[j];
            var demand = demands[i]; 
            var distance = distanceCalculator.getDistanceInKM(base, demand)
            if (distance <= 9999) {
                var operation = modelCreator.createOperationObject(base, demand, distance);
                operations.push(operation);
                demandsOfBase[i+1].push(distance);
            }

        }
        
        var valueOfOneRowToSend = demandsOfBase[i]
        if (i == 0) {
            valueOfOneRowToSend.unshift("");
        } else {
            valueOfOneRowToSend.unshift(`K${i}`);
        }

        createCSVForOneRow(valueOfOneRowToSend, i + 1 == demands.length ? true : false);
    }
}


var createCSVForOneRow = (demandsOfOneBase, isLastRow) => {

    for (var i = 0; i < demandsOfOneBase.length; i++) {
        var symbol = i == demandsOfOneBase.length - 1 ? "\n" : ", "
        var value = demandsOfOneBase[i] + symbol

        fs.appendFileSync(outPutFileName, `${value}`);
    }

    callback(isLastRow);

}

module.exports = start;