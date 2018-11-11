var SENSOR_DATA_DATABASE =  require("../../constants").SENSOR_DATA_DATABASE;
var mongoose = require('mongoose');

var sensorDataSchema = new mongoose.Schema({
  id: String,
  time: { type: Date, default: Date.now },
  position: Object,
  dataType: Object,
  sensorData: Object
})

var sensorDB = mongoose.model(SENSOR_DATA_DATABASE, sensorDataSchema);

module.exports = sensorDB