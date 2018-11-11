import {Multi} from "johnny-five";

export default class Dht11{
  constructor(board){
    this.board = board;
    this.multi = null;
    this.val = null;
  }

  init = () => {
    this.multi = new Multi({
      controller: "DHT11_I2C_NANO_BACKPACK"
    });
  }

  start = () => {
    // console.log(this.multi);
    if(this.multi){
      this.multi.on("change", () => {
        this.val =  {
          temperature: {
            celsius: this.multi.thermometer.celsius,
            fahrenheit: this.multi.thermometer.fahrenheit,
            kelvin: this.multi.thermometer.kelvin
          },
          humidity: {
            relativeHumidity: this.multi.hygrometer.relativeHumidity
          }
        }
      });
    }
  }

  getVal = () => {
    return this.val;
  }
} 