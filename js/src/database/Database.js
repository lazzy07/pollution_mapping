import mongoose from "mongoose";

let sensorDataDB = require("./schemas/SensorDataSchema");
let imageDataBase64DB = require("./schemas/ImageDataSchema");

const databaseConnection = "mongodb://127.0.0.1:27017/pollution_database";

class DatabaseConnection{
  static initDatabase = () => {
    mongoose.connect(databaseConnection, { useNewUrlParser: true });
    console.log("Loacal Databse Connected");
  }

  static saveData = (data) => {

    switch(data.type){
      case "SENSOR_DATA":
        console.log(data.payload)
        let sensorData = new sensorDataDB(data.payload);

        sensorData.save().then(() => {
          let date = new Date();
          let dateString = date.toLocaleTimeString();
          console.log(dateString+ ": sensor data saved");
          return true;
        }).catch(err => {
          console.log(err);
          return false;
        })
        break;

      case "IMAGE_DATA_BASE64":
        let imageData = new imageDataBase64DB(data.payload);

        imageData.save().then(()=>{
          let date = new Date();
          let dateString = date.toLocaleTimeString();
          console.log(dateString+ ": image data saved");
          return true;
        }).catch(err => {
          console.log(err);
          return false;
        })
        break;
    }
  }
}

export default DatabaseConnection;

