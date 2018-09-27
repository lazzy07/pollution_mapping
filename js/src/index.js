import ConsoleStylingClass from './console/ConsoleStyling';
import ArduinoBoard from './board/ArduinoBoard';
import SmokeSensor from "./modules/smoke_sensor/SmokeSensor"
import Connection from './send/Connection';
import GpsModule from './modules/gps/GpsModule';

class MainClass{
  static async main(){
    Connection.initServer();
    const unoBoard = new ArduinoBoard("COM4", 9600);
    try{
      let board = await unoBoard.connectBoard();
      let smokeSensor = new SmokeSensor(board, 3);
      let gpsModule = new GpsModule(board);

      smokeSensor.setSensorReadingAnalog();

      gpsModule.init();
      gpsModule.start();

      board.loop(2000, ()=> {
        let smokeData = smokeSensor.getSmokeData(smokeSensor.getSensorVal());
        
        let gpsData = {
          location: gpsModule.getLocation(),
          navigation: gpsModule.getNav(),
          sentence: gpsModule.getSentence()
        }

        //console.log(smokeData);
        console.log(gpsData);
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
