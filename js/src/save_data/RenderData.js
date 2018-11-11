const initSensordata = {
  mq135: 0,
  mq2: 0,
  mic: 0,
  humidity : 0,
  temperature: {
    celsius: 0,
    fahrenheit: 0,
    kelvin: 0
  },
  soil: 0,
  location: {
    latitude: 0,
    longitude: 0,
    altitude: 0
  }
}

export default class RenderData{
  static imageArr = [];
  static avgSensorData = initSensordata;
  static iterations = 1;
  static collectData = false;

  static addImageToArr = (image) => {
    RenderData.imageArr.push(image);
  }

  static getAvg = (key,avgData, data) => {
    return (avgData[key] + data[key]);
  }

  static startCollectingData = () => {
    this.collectData = true;
    this.flushImageArr();
    this.avgSensorData = initSensordata;
    this.iterations = 1;
  }

  static collectdata = (data) => {
    this.avgSensorData = {
      mq135: this.getAvg("mq135", this.avgSensorData, data),
      mq2: this.getAvg("mq2", this.avgSensorData, data),
      mic: this.getAvg("mic", this.avgSensorData, data),
      humidity: this.getAvg("humidity", this.avgSensorData, data),
      soil: this.getAvg("soil", this.avgSensorData, data),
      temperature: {
        celsius: this.getAvg("celsius", this.avgSensorData.temperature, data.temperature),
        fahrenheit: this.getAvg("fahrenheit", this.avgSensorData, data),
        kelvin: this.getAvg("kelvin", this.avgSensorData, data)
      },
      location: {
        latitude: this.getAvg("latitude", this.avgSensorData.location, data.location),
        longitude: this.getAvg("longitude", this.avgSensorData.location, data.location),
        altitude: this.getAvg("altitude", this.avgSensorData.location, data.location)
      }
    }
    this.iterations++;
  }

  static stopCollectingData = () => {
    this.collectData = false;
    return this.avgSensorData;
  }

  static flushImageArr = () => {
    RenderData.imageArr = [];
  }
  
  static getData = (data) => {
    return {
      sensor: {
        mq135: data.mq135,
        mq2: data.mq2,
        temperature: data.temperature,
        humidity: data.humidity,
        mic: data.mic,
        soil: data.soil
      },
      location: {
        ...data.location
      },
      images: imageArr
    }
  }
}