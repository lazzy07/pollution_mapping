import React, { Component } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default class CustomLineGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lineData: []
    };
  }

  mapDataToLines = data => {
    return data.map(lData => {
      return (
        <Line
          dot={false}
          key={lData.id}
          yAxisId={this.props.yAxisId}
          isAnimationActive={this.props.isAnimationActive}
          type="monotone"
          dataKey={lData.datakey}
          stroke={lData.color}
        />
      );
    });
  };

  componentWillMount() {
    this.setState({
      lineData: this.mapDataToLines(this.props.compileData)
    });
  }

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={[...this.props.data]}>
          <CartesianGrid
            stroke={this.props.axisColor || "#fff"}
            strokeDasharray="3 3"
          />
          <XAxis
            tick={{ fill: this.props.axisColor || "#fff" }}
            dataKey={this.props.xaxis}
          />
          <YAxis
            domain={["auto", "auto"]}
            yAxisId={this.props.yAxisId}
            tick={{ fill: this.props.axisColor || "#fff" }}
          />
          <Tooltip contentStyle={{ backgroundColor: "#252525" }} />
          <Legend />
          {this.state.lineData}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
