import five from "johnny-five";

class Mq135Sensor{
  constructor(board, pin){
    this.pin = pin;
    this.board = board;
    this.val = 0;
    this.initSensorAnalog();
    this.ro = 98800; //0;
    // this.caldata = gasData;
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

  // calRoVal(values){
  //   let totalVal = 0;
  //   len = values.length
  //   for(let i=0;i<len;i++){
  //     totalVal += values[i]
  //   }
  //   return totalVal/len;
  // }

  // calSmokeData(sensorVal, smokeData){
  //   const {ppm, resistance} = smokeData;

  //   const ltx = ppm;
  //   const lty = resistance;

  //   const Vs = this.Vref - sensorVal * this.Vref / 1024.0;
  //   const Rs = (this.R1 * Vs) / (this.Vref - Vs);

  //   const Y = Rs / this.ro;

  //   const slope = LogGraphFunctions.find_slope(Y, lty, ltx);
  //   const Xo = LogGraphFunctions.find_Xo(Y, lty, ltx);
  //   const Yo = LogGraphFunctions.find_Yo(Y, lty);

  //   let gasConcentration = Xo * Math.pow(Y / Yo, slope);

  //   if (gasConcentration > 10000.00) {
  //     gasConcentration = 10000.00;
  //   }
  //   else if (gasConcentration < 200.00) {
  //     gasConcentration = 200.00;
  //   }
  //   return gasConcentration; 
  // }

  getSmokeData(sensorReading){
    return {
      mq135sensor: sensorReading
    }
  }
}

export default Mq135Sensor;