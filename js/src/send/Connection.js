const io = require('socket.io')();

let socketList = []

class Connection{
  static initServer = () => {
    io.on('connection', (client) => {
      console.log("Client initiated");
      socketList.push(client);
    });

    const port = 8000;
    io.listen(port);
    console.log('listening on port ', port);
  }

  static sendDataToClient = (data) => {
    switch(data.type){
      case "SENSOR_DATA":
        let sendData = data;
        sendData.payload.time = Date.now();
        for(let i=0;i< socketList.length; i++){
          socketList[i].emit(data.type, sendData.payload);
        }
        break;

      case "LOCATION_DATA":
        for(let i=0;i< socketList.length; i++){
          socketList[i].emit(data.type, data.payload);
        }
        break;

      default:
        console.log("ERROR ::: Wrong data in parser");
    }
  }
}

export default Connection;
