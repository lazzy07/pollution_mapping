import five from "johnny-five";
export default class Mic {
  constructor(board,pin){
    this.board=board;
    this.pin=pin;
    this.val=0;
    this.initSensorAnalog();
  }
  initSensorAnalog=()=>{
    this.board.pinMode(this.pin,five.Pin.ANALOG);
  }

  setSensorReadingAnalog=()=>{
    this.board.analogRead(this.pin,val=>{
      this.val=val;
    });
  
  }

  getval=()=>{
    return this.val;
  }
} 