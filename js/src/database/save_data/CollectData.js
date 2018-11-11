const toSaveInit = {
  mq2: [],
  mq135: [],
  mic: [],
  celsius: [],
  fahrenheit: [],
  relativeHumidity: [],
  kelvin: [],
  longitude: [],
  latitude: [],
  altitude: []
}

export default class CollectData {
  constructor(){
    this.dataCollected = toSaveInit;
  }

  stopCollectingData = (dataType) => {
    let dataSave = this.getDataToSaveToDatabase(dataType);
    this.dataCollected = toSaveInit;
    return dataSave;
  }

  collectData = (name, data) => {
    this.dataCollected[name].push(data);
  }

  takeAverage = (data) => {
    let total = 0;
    for(let i =0; i<data.length; i++){
      total += data[i]
    }
    return total/data.length;
  }

  getDataToSaveToDatabase = (dataType) => {
    return{
      sensorData: {
        mq2: parseInt(this.takeAverage(this.dataCollected.mq2)),
        mq135: parseInt(this.takeAverage(this.dataCollected.mq135)),
        mic: parseInt(this.takeAverage(this.dataCollected.mic)),
        dht11: {
          celsius: parseInt(this.takeAverage(this.dataCollected.celsius)),
          fahrenheit: parseInt(this.takeAverage(this.dataCollected.fahrenheit)), 
          kelvin: parseInt(this.takeAverage(this.dataCollected.kelvin)),
          relativeHumidity: parseInt(this.takeAverage(this.dataCollected.relativeHumidity))
        }
      },
      position: {
        longitude: this.takeAverage(this.dataCollected.longitude),
        latitude: this.takeAverage(this.dataCollected.latitude),
        altitude: this.takeAverage(this.dataCollected.altitude)
      },
      dataType
    }
  }
}