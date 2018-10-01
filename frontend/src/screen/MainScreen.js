import React, { Component } from "react";
import CustomLineGraph from "../components/CustomLineGraph";
import CustomGradientLineGraph from "../components/CustomGradientLineGraph";
import PositionMap from "../components/PositionMap";

export default class MainScreen extends Component {
  compileData = [
    {
      id: 0,
      datakey: "alcohol",
      color: "#fff"
    },
    {
      id: 1,
      datakey: "ch4",
      color: "#e8232d"
    },
    {
      id: 2,
      datakey: "co",
      color: "#00fcdb"
    },
    {
      id: 3,
      datakey: "h2",
      color: "#ef43c1"
    },
    {
      id: 4,
      datakey: "lpg",
      color: "#ece900"
    },
    {
      id: 5,
      datakey: "propane",
      color: "#7a7a7a"
    },
    {
      id: 6,
      datakey: "smoke",
      color: "#00ff00"
    },
    {
      id: 7,
      datakey: "mq2sensor",
      color: "#e39f33"
    }
  ];

  render() {
    return (
      <div>
        {/* <div className="row">
          <div
            className="col-12"
            style={{ height: "50vh", marginTop: "50px", marginBottom: "20px" }}
          >
            <PositionMap location={this.props.location} />
          </div>
        </div> */}
        <div className="row">
          <div className="col-12 col-md-8" style={{ height: "100vh" }}>
            <CustomLineGraph
              isAnimationActive={false}
              compileData={this.compileData}
              data={this.props.data}
              xaxis="timeString"
            />
          </div>
          <div className="col-md-4" style={{ height: "100vh", width: "100%" }}>
            <div className="col-12" style={{ height: "200px", width: "100%" }}>
              <CustomGradientLineGraph
                axisColor={this.compileData[7].color}
                id={this.compileData[7].id}
                lineColor={this.compileData[7].color}
                yAxisId={1}
                isAnimationActive={false}
                compileData={[this.compileData[7]]}
                data={this.props.data}
                xaxis="timeString"
              />
            </div>
            <div className="col-12" style={{ height: "160px" }}>
              <CustomGradientLineGraph
                axisColor={this.compileData[2].color}
                id={this.compileData[2].id}
                lineColor={this.compileData[2].color}
                compileData={[this.compileData[2]]}
                data={this.props.data}
                xaxis="timeString"
              />
            </div>
            <div className="col-12" style={{ height: "160px" }}>
              <CustomGradientLineGraph
                axisColor={this.compileData[6].color}
                id={this.compileData[6].id}
                lineColor={this.compileData[6].color}
                isAnimationActive={false}
                compileData={[this.compileData[6]]}
                data={this.props.data}
                xaxis="timeString"
              />
            </div>
            <div className="col-12" style={{ height: "160px" }}>
              <CustomGradientLineGraph
                axisColor={this.compileData[0].color}
                id={this.compileData[0].id}
                lineColor={this.compileData[0].color}
                yAxisId={1}
                isAnimationActive={false}
                compileData={[this.compileData[0]]}
                data={this.props.data}
                xaxis="timeString"
              />
            </div>
            <div className="col-12" style={{ height: "160px" }}>
              <CustomGradientLineGraph
                axisColor={this.compileData[1].color}
                id={this.compileData[1].id}
                lineColor={this.compileData[1].color}
                yAxisId={1}
                isAnimationActive={false}
                compileData={[this.compileData[1]]}
                data={this.props.data}
                xaxis="timeString"
              />
            </div>
            <div className="col-12" style={{ height: "160px" }}>
              <CustomGradientLineGraph
                axisColor={this.compileData[3].color}
                id={this.compileData[3].id}
                lineColor={this.compileData[3].color}
                yAxisId={1}
                isAnimationActive={false}
                compileData={[this.compileData[3]]}
                data={this.props.data}
                xaxis="timeString"
              />
            </div>
            <div className="col-12" style={{ height: "160px" }}>
              <CustomGradientLineGraph
                axisColor={this.compileData[4].color}
                id={this.compileData[4].id}
                lineColor={this.compileData[4].color}
                yAxisId={1}
                isAnimationActive={false}
                compileData={[this.compileData[4]]}
                data={this.props.data}
                xaxis="timeString"
              />
            </div>
            <div className="col-12" style={{ height: "160px" }}>
              <CustomGradientLineGraph
                axisColor={this.compileData[5].color}
                id={this.compileData[5].id}
                lineColor={this.compileData[5].color}
                yAxisId={1}
                isAnimationActive={false}
                compileData={[this.compileData[5]]}
                data={this.props.data}
                xaxis="timeString"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
