import five from "johnny-five";

class ArduinoBoard{
  constructor(port, baudRate){
    this.port = port;
    this.connected = false;
    this.baudRate = baudRate;
  }

  connectBoard(){
    console.log("Board connecting...");
    //let board = new Board(port, {setSamplingInterval: 1000});
     
    try{
      return new Promise((res, rej)=> {
        const newBoard =new five.Board({port: this.port, baudrate: this.baudRate});

        newBoard.on("ready", () => {
          // Arduino is ready to communicate
          console.log("Board connected!");
          this.connected = true;
          res(newBoard);
        });

        newBoard.on("error", (e)=>{
          rej("ERROR ::: Board Not Working\nError: " + e.message);
        })

        // newBoard.on("message", event => {
        //   console.log("Received a %s message, from %s, reporting: %s", event.type, event.class, event.message);
        // })
      })
    }catch(err){
      console.log(err);
      return null;
    }
  }
}

export default ArduinoBoard;