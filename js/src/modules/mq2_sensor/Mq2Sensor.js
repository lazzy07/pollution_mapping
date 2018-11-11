import five from "johnny-five";


import * as alcoholData from "./process_data/data/characteristics/json/alcohol.json";
import * as ch4Data from "./process_data/data/characteristics/json/ch4.json"
import * as coData from "./process_data/data/characteristics/json/co.json"
import * as h2Data from "./process_data/data/characteristics/json/h2.json";
import * as lpgData from "./process_data/data/characteristics/json/lpg.json";
import * as propaneData from "./process_data/data/characteristics/json/propane.json";
import * as smokeData from "./process_data/data/characteristics/json/smoke.json";

import LogGraphFunctions from "./process_data/LogGraphFunctions";
import {jsonToArray} from "./process_data/JsonToArray";


const gasData = {
  alcohol: jsonToArray(alcoholData.default),
  ch4: jsonToArray(ch4Data.default),
  co: jsonToArray(coData.default),
  h2: jsonToArray(h2Data.default),
  lpg: jsonToArray(lpgData.default),
  propane: jsonToArray(propaneData.default),
  smoke: jsonToArray(smokeData.default)
}

class Mq2Sensor{
  constructor(board, pin){
    this.pin = pin;
    this.board = board;
    this.val = 0;
    this.initSensorAnalog();
    this.ro = 98800; //0;
    this.caldata = gasData;
    this.Vref = 5;
    this.R1 = 7700;
  }

  initSensorAnalog=()=>{
    this.board.pinMode(this.pin, five.Pin.ANALOG);
  }

  setSensorReadingAnalog=()=>{
    this.board.analogRead(this.pin, val=> {
      this.val = val;
    })
  }

  getSensorVal(){
    return this.val;
  }

  setRoVal(val){
    this.ro = val;
  }

  calRoVal(values){
    let totalVal = 0;
    len = values.length
    for(let i=0;i<len;i++){
      totalVal += values[i]
    }
    return totalVal/len;
  }

  calSmokeData(sensorVal, smokeData){
    const {ppm, resistance} = smokeData;

    const ltx = ppm;
    const lty = resistance;

    const Vs = this.Vref - sensorVal * this.Vref / 1024.0;
    const Rs = (this.R1 * Vs) / (this.Vref - Vs);

    const Y = Rs / this.ro;

    const slope = LogGraphFunctions.find_slope(Y, lty, ltx);
    const Xo = LogGraphFunctions.find_Xo(Y, lty, ltx);
    const Yo = LogGraphFunctions.find_Yo(Y, lty);

    let gasConcentration = Xo * Math.pow(Y / Yo, slope);

    if (gasConcentration > 10000.00) {
      gasConcentration = 10000.00;
    }
    else if (gasConcentration < 200.00) {
      gasConcentration = 200.00;
    }
    return gasConcentration; 
  }

  getSmokeData(sensorReading){
    return {
      mq2sensor: sensorReading,
      alcohol: this.calSmokeData(sensorReading, gasData.alcohol),
      ch4: this.calSmokeData(sensorReading, gasData.ch4),
      co: this.calSmokeData(sensorReading, gasData.co),
      h2: this.calSmokeData(sensorReading, gasData.h2),
      lpg: this.calSmokeData(sensorReading, gasData.lpg),
      propane: this.calSmokeData(sensorReading, gasData.propane),
      smoke: this.calSmokeData(sensorReading, gasData.smoke)
    }
  }
}

export default Mq2Sensor;