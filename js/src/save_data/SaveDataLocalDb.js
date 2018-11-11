import uuidv4 from "uuid/v4"
import DatabaseConnection from "../database/Database"

class SaveDataLocalDb {
  static saveData = (data) => {
    switch(data.type){
      case "COLLECT_DATA":
        const id = uuidv4();
        console.log("Collected Data Save..");
        const saveSensorData = {
          type: "SENSOR_DATA",
          payload: {
            id,
            ...data.payload.sensor
          }
        }

        const saveImageData = {
          type: "IMAGE_DATA_BASE64",
          payload: {
            id,
            imagedata: data.payload.image
          }
        }
        DatabaseConnection.saveData(saveSensorData)
        DatabaseConnection.saveData(saveImageData);
        break;
    }
  }
}

export default SaveDataLocalDb;
