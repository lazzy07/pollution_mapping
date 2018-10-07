import React, { Component } from "react";
import MainScreen from "./screen/MainScreen";
import { Route, Switch } from "react-router-dom";
import openSocket from "socket.io-client";
import NavigationBar from "./components/NavigationBar";
import { COLLECT_DATA_LINK, GRAPH_VIEW_DATA_LINK } from "./routes/Routes";

import { MAX_SENSOR_DATA_ARRAY, CONNECTION_URL } from "./constants";
import CollectDataScreen from "./screen/CollectDataScreen";

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
      },
      collectdata: {
        smoke: false,
        sound: false,
        soil: false
      },
      time: 0,
      timer: false,
      collecting: false,
      buttonText: "Collect",

      picArray: []
    };
  }

  setDataCollector = collect => {
    this.setState({
      collectData: {
        ...this.state.collectdata,
        [collect]: true
      }
    });
  };

  unsetCollector = collect => {
    this.setState({
      collectData: {
        ...this.state.collectdata,
        [collect]: false
      }
    });
  };

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

  collectData = () => {
    if (this.state.collecting) {
      this.setState({
        timer: true,
        time: 0,
        collecting: false,
        buttonText: "Collecting..."
      });
    } else {
      this.setState({
        collecting: true,
        time: 0,
        timer: false,
        buttonText: "Collect"
      });
    }
  };

  setTime = time => {
    this.setState({
      time
    });
  };

  setLocationdata = data => {
    this.setState({
      locationData: data
    });
  };

  componentWillMount() {
    socket.emit("ADD_MONITOR");
  }

  componentDidMount = () => {
    socket.on("SENSOR_DATA", data => {
      this.sendDataToGraphData(data);
    });

    socket.on("LOCATION_DATA", data => {
      if (data.latitude !== null) {
        this.setLocationdata(data);
      }
    });

    socket.on("CAMERA_DATA_TO_FRONTEND", data => {
      if (data) {
        this.setState({
          picArray: [...this.state.picArray, data]
        });
      }
    });
  };

  render() {
    return (
      <div>
        <div style={{ marginTop: "60px" }}>
          <Switch>
            <Route
              exact
              path={COLLECT_DATA_LINK}
              component={() => (
                <CollectDataScreen
                  location={this.state.locationData.location}
                  data={this.state.graphData}
                  time={this.state.time}
                  setTime={this.setTime}
                  startTimer={this.state.timer}
                  collectData={this.collectData}
                  buttonText={this.state.buttonText}
                  collectDataCheck={this.state.collectdata}
                  setDataCollector={this.setDataCollector}
                  unsetCollector={this.unsetCollector}
                  imageArr={this.state.picArray}
                />
              )}
            />
            <Route
              path={GRAPH_VIEW_DATA_LINK}
              component={() => (
                <MainScreen
                  location={this.state.locationData.location}
                  data={this.state.graphData}
                />
              )}
            />
          </Switch>
          {/* <MainScreen
              location={this.state.locationData.location}
              data={this.state.graphData}
            /> */}
          {/* <MapScreen data={this.state.locationData.location} /> */}
          <Route path="" component={NavigationBar} />
        </div>
      </div>
    );
  }
}

export default App;
