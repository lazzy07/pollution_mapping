import React, { Component } from "react";
import MainScreen from "./screen/MainScreen";
import MapScreen from "./screen/MapScreen";
import openSocket from "socket.io-client";
import NavigationBar from "./components/NavigationBar";

import { MAX_SENSOR_DATA_ARRAY, CONNECTION_URL } from "./constants";

const socket = openSocket(CONNECTION_URL);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graphData: [],
      locationData: {
        location: {
          longitude: 80.6356,
          latitude: 7.2955
        }
      }
    };
  }

  sendDataToGraphData = data => {
    const graphData = this.state.graphData;

    let date = new Date(data.time);

    data.timeString = date.toISOString().substr(11, 8);

    if (graphData.length > MAX_SENSOR_DATA_ARRAY) {
      graphData.splice(0, 1);
      graphData.push(data);
    } else {
      graphData.push(data);
    }

    this.setState({
      graphData
    });
  };

  setLocationdata = data => {
    this.setState({
      locationData: data
    });
  };

  componentDidMount = () => {
    socket.on("SENSOR_DATA", data => {
      this.sendDataToGraphData(data);
    });

    socket.on("LOCATION_DATA", data => {
      if (data.latitude !== null) {
        this.setLocationdata(data);
      }
    });
  };

  render() {
    return (
      <div>
        <NavigationBar />
        <MainScreen
          location={this.state.locationData.location}
          data={this.state.graphData}
        />
        {/* <MapScreen data={this.state.locationData.location} /> */}
      </div>
    );
  }
}

export default App;
