import ConsoleStylingClass from './console/ConsoleStyling';
import ArduinoBoard from './board/ArduinoBoard';
import SmokeSensor from "./modules/smoke_sensor/SmokeSensor"
import Connection from './send/Connection';
import GpsModule from './modules/gps/GpsModule';
import Mic from './modules/mic/Mic';
import Soil from './modules/soil/Soil';

class MainClass{
  static async main(){
    Connection.initServer();
    const unoBoard = new ArduinoBoard("COM3", 9600);
    try{
      let board = await unoBoard.connectBoard();
      let smokeSensor = new SmokeSensor(board, 1);
      let gpsModule = new GpsModule(board);
      let mic = new Mic(board,2);
      let soil= new Soil(board,3);

      smokeSensor.setSensorReadingAnalog();
      mic.setSensorReadingAnalog();
      gpsModule.init();
      gpsModule.start();

      board.loop(1000, ()=> {
        let smokeData = smokeSensor.getSmokeData(smokeSensor.getSensorVal());
        
        let gpsData = {
          location: gpsModule.getLocation(),
          navigation: gpsModule.getNav(),
          sentence: gpsModule.getSentence(),
        }

        //console.log(smokeData);
        //console.log(gpsData);
        //console.log(mic.getval());
        Connection.sendDataToClient({
          type: "SENSOR_DATA",
          payload: smokeData
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
