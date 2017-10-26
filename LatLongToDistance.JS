var geodist = require('geodist');

function getDistanceInKM(location0, location1) {
  var locationA = {
    lat: location0.lat,
    lon: location0.long
  }
  var locationB = {
    lat: location1.lat,
    lon: location1.long
  }

  var result = geodist(locationA, locationB, {exact: true, unit: 'km'})
  
  return result;
}

module.exports = {getDistanceInKM};