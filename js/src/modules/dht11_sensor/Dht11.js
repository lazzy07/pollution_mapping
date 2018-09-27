import {Multi} from "johnny-five";

export default class Dht11{
  constructor(board){
    this.board = board;
    this.multi = null;
  }

  init = () => {
    this.multi = new Multi({
      controller: "DHT11_I2C_NANO_BACKPACK"
    });
  }

  start = () => {
    if(this.multi){
      multi.on("change", () => {
        return {
          temperature: {
            celsius: multi.temperature.celsius,
            fahrenheit: multi.temperature.fahrenheit,
            kelvin: multi.temperature.kelvin
          },
          humidity: {
            relativeHumidity: multi.hygrometer.relativeHumidity
          }
        }
      });
    }
  }
} 