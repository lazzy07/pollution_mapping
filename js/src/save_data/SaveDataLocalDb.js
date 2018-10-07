import uuidv3 from "uuid/v3"
import DatabaseConnection from "../database/Database"

class SaveDataLocalDb {
  static saveData = (data) => {
    switch(data.payload){
      case "COLLECT_DATA":
        const id = uuidv3();
        const saveSensorData = {
          type: "SENSOR_DATA",
          payload: {
            id,
            ...data.payload
          }
        }

        const saveImageData = {
          type: "IMAGE_DATA_BASE64",
          payload: {
            id,
            ...data.payload
          }
        }

        if(DatabaseConnection.saveData(saveSensorData)){
          DatabaseConnection.saveData(saveImageData);
        }
        break;
    }
  }
}

export default SaveDataLocalDb;
