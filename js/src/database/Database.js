import mongoose from "mongoose";
import sensorDataDB from "./schemas/SensorDataSchema";
import imageDataBase64DB from "./schemas/ImageDataSchema";

const databaseConnection = "127.0.0.1:27017/pollution_database";

class DatabaseConnection{
  static initDatabase = () => {
    mongoose.connect(databaseConnection);
    console.log("Loacal Databse Connected");
  }

  static saveData = (data) => {
    switch(data.type){
      case "SENSOR_DATA":
        let sensorData = new sensorDataDB();
        sensorData = {
          ...data.payload
        }

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
        let imageData = new imageDataBase64DB();
        imageData = {
          ...data.payload
        }

        imageData.save().then(()=>{
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

