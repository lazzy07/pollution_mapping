import React, { Component } from "react";
import MainScreen from "./screen/MainScreen";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import openSocket from "socket.io-client";
import NavigationBar from "./components/NavigationBar";
import { COLLECT_DATA_LINK, GRAPH_VIEW_DATA_LINK } from "./routes/Routes";

import {
  setGpsData,
  setMicData,
  setHumidityData,
  setMq2Data,
  setMq135Data,
  setSoilData
} from "./redux/actions/RecieveDataActions";

import { CONNECTION_URL } from "./constants";
import CollectDataScreen from "./screen/CollectDataScreen";
import {
  setGraphDataMic,
  setGraphDataMq2,
  setGraphDataMq135,
  setGraphDataSoil
} from "./redux/actions/GraphDataActions";

const socket = openSocket(CONNECTION_URL);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageArr: []
    };
  }

  componentWillMount() {
    socket.emit("ADD_MONITOR");
  }

  componentDidMount = () => {
    socket.on("SENSOR_DATA", data => {
      if (data.mq2) {
        this.props.setMq2(data.mq2);
        this.props.graphMq2(data.mq2);
      }
      if (data.mq135) {
        this.props.setMq135(data.mq135);
        this.props.graphMq135(data.mq135);
      }
      if (data.mic) {
        this.props.setMic(data.mic);
        this.props.graphMic(data.mic);
      }
      if (data.dht11) {
        this.props.setHumidity(data.dht11);
      }
    });

    socket.on("LOCATION_DATA", data => {
      if (data.location) {
        if (data.location.latitude !== null) {
          this.props.setGps(data);
        }
      }
    });

    socket.on("CAMERA_DATA_TO_FRONTEND", data => {
      if (data) {
        this.setState({
          imageArr: [...this.state.imageArr, data]
        });
      }
    });
  };

  sendCollectInfo = (type, data) => {
    socket.emit("COLLECT_DATA_STATE", {
      type,
      payload: { type, ...data }
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
                  sendCollectInfo={(type, data) =>
                    this.sendCollectInfo(type, data)
                  }
                />
              )}
            />
            <Route
              path={GRAPH_VIEW_DATA_LINK}
              component={() => <MainScreen />}
            />
          </Switch>
          <Route path="" component={NavigationBar} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  graphMic: setGraphDataMic,
  graphMq2: setGraphDataMq2,
  graphMq135: setGraphDataMq135,
  graphSoil: setGraphDataSoil,
  setGps: setGpsData,
  setHumidity: setHumidityData,
  setMic: setMicData,
  setMq2: setMq2Data,
  setMq135: setMq135Data,
  setSoil: setSoilData
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
