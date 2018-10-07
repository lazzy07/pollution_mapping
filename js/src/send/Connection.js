const io = require('socket.io')();

let socketList = []
let monitorList=[]
let cameraList = []

class Connection{
  static imageData = null;

  static initServer = () => {
    io.on('connection', (client) => {
      console.log("Client initiated");
      socketList.push(client);

      client.on("ADD_MONITOR", ()=> {
        console.log("Monitor Added");
        monitorList.push(client);
      })

      client.on("ADD_CAMERA", () => {
        console.log("Camera Added");
        cameraList.push(client);
      })

      client.on("UPLOAD_PIC", (data)=>{

        Connection.sendDataToClient({
          type: "CAMERA_DATA_TO_FRONTEND",
          payload: data
        })
      })

      client.on("START_COLLECTING_DATA",() => {

      })

      client.on("STOP_COLLECTING_DATA", ()=>{

      })

      client.on("SAVE_COLLECTED_DATA",()=>{

      })

      client.on("disconnect", ()=> {
        for(let i=0; i<socketList.length;i++){
          if(socketList[i] === client){
            socketList.splice(i,1);
            console.log("Client left: deleted from Socket List");
          }
        }
        for(let i=0; i<monitorList.length;i++){
          if(monitorList[i] === client){
            monitorList.splice(i,1);
            console.log("Monitor removed!!!");
          }
        }
        for(let i=0; i<cameraList.length;i++){
          if(cameraList[i] === client){
            cameraList.splice(i,1);
            console.log("Camera removed!!!");
          }
        }
      })
    });

    const port = 8000;
    io.listen(port);
    console.log('listening on port ', port);
  }

  static getImageData = () => {
    let imData = Connection.imageData;
    Connection.imageData = null;
    return imData;
  }

  static sendDataToClient = (data) => {
    switch(data.type){
      case "SENSOR_DATA":
        let sendData = data;
        sendData.payload.time = Date.now();
        for(let i=0;i< monitorList.length; i++){
          if(monitorList[i]){
            monitorList[i].emit(data.type, sendData.payload);
          }
        }
        break;

      case "LOCATION_DATA":
        for(let i=0;i< monitorList.length; i++){
          if(monitorList[i]){
            monitorList[i].emit(data.type, data.payload);
          }
        }
        break;

      case "CAMERA_DATA_TO_FRONTEND":
        for(let i=0;i< monitorList.length; i++){
          if(monitorList[i]){
            monitorList[i].emit(data.type, data.payload);
          }
        }
        break;

      default:
        console.log("ERROR ::: Wrong data in parser");
    }
  }
}

export default Connection;
