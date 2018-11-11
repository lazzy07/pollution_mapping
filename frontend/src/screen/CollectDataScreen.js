import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import PositionMap from "../components/PositionMap";
import { Button } from "../components/Button";
import Timer from "../components/Timer";
import { Checkbox } from "../components/Checkbox";

import {
  startTimer,
  stopTimer,
  setCollectType,
  collectStateChange,
  removeImageArray
} from "../redux/actions/CollectDataActions";

class CollectDataScreen extends Component {
  changeCollectState = collect => {
    if (this.props.collectDataCheck[collect]) {
      this.props.unsetCollector(collect);
    } else {
      this.props.setDataCollector(collect);
    }
  };

  collectData = () => {
    if (this.props.buttonText === "Collect") {
      this.props.collectStateChange();
      this.props.startTimer();
      this.props.sendCollectInfo("start", {
        ...this.props.collectData
      });
    } else {
      this.props.collectStateChange();
      this.props.stopTimer();
      this.props.sendCollectInfo("stop", null);
      this.props.removeImageArray();
    }
  };

  setDataCollector = data => {
    this.props.setCollectType({
      [data]: true
    });
  };

  mapToImages = imageArr => {
    return imageArr.map((img, index) => {
      return (
        <img
          key={index}
          src={"data:image/jpeg;base64, " + img.base64}
          width="100%"
          alt=""
          style={{ transform: "rotate(90deg)" }}
        />
      );
    });
  };

  render() {
    if (this.props.gps.location) {
      return (
        <div style={{ color: "#00fcdb" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "10px"
            }}
          >
            <div
              style={{
                padding: "20px",
                boxShadow:
                  "0 0px 5px rgba(0, 252, 219, 0.2), 0 0 40px rgba(0, 252, 219, 0.1) inset"
              }}
            >
              <h4 style={{ textShadow: "2px 2px 5px rgba(0, 252, 219, 0.4)" }}>
                GPS Data
              </h4>
              <p>
                Latitude : {this.props.gps.location.latitude}
                <br />
                Longitude: {this.props.gps.location.longitude}
              </p>
            </div>
            <div
              style={{
                padding: "20px",
                boxShadow:
                  "0 0px 5px rgba(0, 252, 219, 0.2), 0 0 40px rgba(0, 252, 219, 0.1) inset"
              }}
            >
              <h4 style={{ textShadow: "2px 2px 5px rgba(0, 252, 219, 0.4)" }}>
                MQ2 Sensor
              </h4>
              <p>Reading: {this.props.mq2.mq2sensor}</p>
            </div>
            <div
              style={{
                padding: "20px",
                boxShadow:
                  "0 0px 5px rgba(0, 252, 219, 0.2), 0 0 40px rgba(0, 252, 219, 0.1) inset"
              }}
            >
              <h4 style={{ textShadow: "2px 2px 5px rgba(0, 252, 219, 0.4)" }}>
                MQ135 Sensor
              </h4>
              <p>Reading: {this.props.mq135.mq135sensor}</p>
            </div>
            <div
              style={{
                padding: "20px",
                boxShadow:
                  "0 0px 5px rgba(0, 252, 219, 0.2), 0 0 40px rgba(0, 252, 219, 0.1) inset"
              }}
            >
              <h4 style={{ textShadow: "2px 2px 5px rgba(0, 252, 219, 0.4)" }}>
                Humidity Sensor
              </h4>
              <p>
                Humidity: {this.props.humidity.humidity.relativeHumidity}
                <br />
                Temp: {this.props.humidity.temperature.celsius}
              </p>
            </div>
            <div
              style={{
                padding: "20px",
                boxShadow:
                  "0 0px 5px rgba(0, 252, 219, 0.2), 0 0 40px rgba(0, 252, 219, 0.1) inset"
              }}
            >
              <h4 style={{ textShadow: "2px 2px 5px rgba(0, 252, 219, 0.4)" }}>
                Sound Level
              </h4>
              <p>Mic: {this.props.mic.value}</p>
            </div>
          </div>
          <div className="row">
            <div
              className="col-12 col-md-6"
              style={{
                padding: "20px",
                margin: "10px",
                boxShadow:
                  "0 0px 5px rgba(0, 252, 219, 0.2), 0 0 40px rgba(0, 252, 219, 0.1) inset"
              }}
            >
              <p style={{ textShadow: "2px 2px 5px rgba(0, 252, 219, 0.4)" }}>
                You Are Here:
              </p>
              <div
                className="col-12"
                style={{
                  height: "47vh",
                  marginTop: "20px",
                  marginBottom: "20px"
                }}
              >
                <PositionMap location={this.props.gps.location} />
              </div>
            </div>
            <div style={{ padding: "20px" }} className="col-12 col-md-4">
              <div
                style={{
                  boxShadow:
                    "0 0px 5px rgba(0, 252, 219, 0.2), 0 0 40px rgba(0, 252, 219, 0.1) inset",
                  padding: "10px",
                  margin: "10px"
                }}
              >
                <p>Collect Data : </p>
                <Checkbox
                  checked={this.props.collect.smoke}
                  onClick={() => this.setDataCollector("smoke")}
                  label="Smoke Data"
                />
                <Checkbox
                  checked={this.props.collect.sound}
                  onClick={() => this.setDataCollector("sound")}
                  label="Sound Level Data"
                />
                <Checkbox
                  checked={this.props.collect.soil}
                  onClick={() => this.setDataCollector("soil")}
                  label="Soil Moisture Data"
                />
                <Timer />
                <Button
                  onClick={this.collectData}
                  text={this.props.buttonText}
                />
              </div>
              <div className="col-12">
                {this.mapToImages(this.props.images)}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            textShadow: "2px 2px 5px rgba(0, 252, 219, 0.4)",
            display: "flex",
            height: "100vh",
            color: "#00fcdb",
            textAlign: "center",
            textJustify: "center",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div>GPS Data not recieving</div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = {
  startTimer,
  stopTimer,
  setCollectType,
  collectStateChange,
  removeImageArray
};

const mapStateToProps = state => {
  return {
    mq2: state.mq2,
    mq135: state.mq135,
    mic: state.mic,
    gps: state.gps,
    humidity: state.humidity,
    soil: state.soil,
    collect: state.collect,
    images: state.collect.imageArray,
    buttonText: state.collect.collectType,
    collectData: state.collect.collectData
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CollectDataScreen)
);
