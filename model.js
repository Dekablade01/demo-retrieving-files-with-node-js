var createLocationObject = (key, name, cityID, cityName, lat, long) => {
    return { key: key, cityID: cityID, cityName: cityName, lat: lat, long: long}
}

var createOperationObject = (baseLocation, accidentPlace, distance) => {
    // do something to calculate distance from base to accident place
    return { baseLocation: baseLocation, accidentPlace: accidentPlace, distance: distance }
}

var createAmbulanceObject = (key, isAdvance, numberOfBaseStation) => {
    var object = { key: key, isAdvance: isAdvance, dvar: [] }
    for (var i = 0; i < numberOfBaseStation; i++){
        object.dvar.push(false)
    }

    return object;
}

var crateSupporingOperationForEachAccidentPlace = (accidentKey, operations) => {

    var supportingForAccident = []
    for (var i = 0; i < operations.length; i++) {
        var operation = operations[i];
        if (accidentKey == operation.accidentPlace.key) {
            supportingForAccident.push(operation.baseLocation)
        }
    }

    var resultObject = {
        key: accidentKey, 
        numberOfSupportBaseLocation: supportingForAccident.length,        
        baseLocations: supportingForAccident
    }

    return resultObject;
}

module.exports = { createLocationObject, createOperationObject, createAmbulanceObject, crateSupporingOperationForEachAccidentPlace };