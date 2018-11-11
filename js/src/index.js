import ConsoleStylingClass from './console/ConsoleStyling';
import ArduinoBoard from './board/ArduinoBoard';
import Mq2Sensor from "./modules/mq2_sensor/Mq2Sensor";
import Mq135Sensor from "./modules/mq135_sensor/Mq135Sensor";
import Connection from './send/Connection';
import GpsModule from './modules/gps/GpsModule';
import Mic from './modules/mic/Mic';
import Dht11 from './modules/dht11_sensor/Dht11';
import CollectData from "./database/save_data/CollectData";
import DatabaseConnection from './database/Database';
import SaveDataLocalDb from "./save_data/SaveDataLocalDb";


class MainClass{
  static async main(){
    Connection.initServer();
    DatabaseConnection.initDatabase();
    const unoBoard = new ArduinoBoard("COM3", 9600);
    try{
      let board = await unoBoard.connectBoard();

      let mq2Sensor = new Mq2Sensor(board, 0);
      let mq135Sensor = new Mq135Sensor(board, 1);
      let mic = new Mic(board, 2);
      let dht11 = new Dht11(board);
      let gpsModule = new GpsModule(board);

      let collectData = new CollectData();

      mq2Sensor.setSensorReadingAnalog();
      mq135Sensor.setSensorReadingAnalog();
      mic.setSensorReadingAnalog();
      gpsModule.init();
      dht11.init();
      gpsModule.start();
      dht11.start();

      board.loop(1000, ()=> {
        let mq2Val = mq2Sensor.getSensorVal();
        let mq135Val = mq135Sensor.getSensorVal();
        let micData = mic.getval(); 

        let mq2Data = mq2Sensor.getSmokeData(mq2Val);
        let mq135Data = mq135Sensor.getSmokeData(mq135Val);

        let gpsData = {
          location: gpsModule.getLocation(),
          navigation: gpsModule.getNav(),
          sentence: gpsModule.getSentence(),
        }
        let dhtData = dht11.getVal();
        
        // console.log(dhtData);
        //console.log(smokeData);
        // console.log(gpsData);
        // console.log(micData);

        let isCollectData = Connection.isCollectData;
        let stopCollecting = Connection.stopCollecting;
        let picArray = Connection.picArray;

        if(isCollectData){
          console.log("Data Collecting....");
          collectData.collectData("mq2", mq2Data.mq2sensor);
          collectData.collectData("mq135", mq135Data.mq135sensor);
          collectData.collectData("mic", micData);
          collectData.collectData("celsius", dhtData.temperature.celsius);
          collectData.collectData("fahrenheit", dhtData.temperature.fahrenheit);
          collectData.collectData("kelvin", dhtData.temperature.fahrenheit);
          collectData.collectData("relativeHumidity", dhtData.humidity.relativeHumidity);
          collectData.collectData("latitude", gpsData.location.latitude);
          collectData.collectData("longitude", gpsData.location.longitude);
          collectData.collectData("altitude", gpsData.location.altitude);
        }

        if(stopCollecting){
          let dataToSave = collectData.stopCollectingData(Connection.dataCollectionType);
          console.log("Data collection stoppped...");
          SaveDataLocalDb.saveData({type: "COLLECT_DATA", payload: {
            sensor: dataToSave,
            image: picArray
          }})
          Connection.picArray = [];
          Connection.dataCollectionType = {
            smoke: false,
            soil: false,
            sound: false
          };
          Connection.stopCollecting = false;
        }

        Connection.sendDataToClient({
          type: "SENSOR_DATA",
          payload: {
            mq2: mq2Data,
            mq135: mq135Data,
            mic: micData,
            dht11: dhtData
          }
        });

        Connection.sendDataToClient({
          type: "LOCATION_DATA",
          payload: gpsData
        })
      })
    }catch(err){
      console.log(err);
    }
  }
}


ConsoleStylingClass.run();
MainClass.main();
