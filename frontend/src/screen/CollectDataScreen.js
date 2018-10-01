import React, { Component } from "react";
import PositionMap from "../components/PositionMap";
import { Button } from "../components/Button";
import Stopwatch from "react-stopwatch";
import { Timer } from "../components/Timer";
import { Checkbox } from "../components/Checkbox";

export default class CollectDataScreen extends Component {
  render() {
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
              Latitude : {this.props.location.latitude}
              <br />
              Longitude: {this.props.location.longitude}
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
            <p>Reading: {this.props.data.mq2}</p>
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
            <p>Reading: {this.props.data.mq135}</p>
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
              Humidity: {this.props.data.humidity}
              <br />
              Temp: {this.props.data.temperature}
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
            <p>Mic: {this.props.data.mic}</p>
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
              {/* <PositionMap location={this.props.location} /> */}
            </div>
          </div>
          <div style={{ padding: "20px" }} className="col-12 col-md-4">
            <Timer start />
            <div
              style={{
                boxShadow:
                  "0 0px 5px rgba(0, 252, 219, 0.2), 0 0 40px rgba(0, 252, 219, 0.1) inset",
                padding: "10px",
                margin: "10px"
              }}
            >
              <p>Collect Data : </p>
              <Checkbox label="Smoke Data" />
              <Checkbox label="Sound Level Data" />
              <Checkbox label="Soil Moisture Data" />
              <Button text="Collect" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
