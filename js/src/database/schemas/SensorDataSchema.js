import {SENSOR_DATA_DATABASE} from "../../constants";
import mongoose from "mongoose";


sensorDataSchema = mongoose.Schema({
  id: String,
  time: { type: Date, default: Date.now },
  position: Object,
  dataType: Object,
  sensorData: Object
})

sensorDataDB = mongoose.model(SENSOR_DATA_DATABASE, sensorDataSchema)

export default sensorDataDB;