import React, { Component } from "react";

export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
    this.timer = null;
  }

  upCount = () => {
    if (this.props.start) {
      this.setState({
        time: this.state.time + 1
      });
      this.props.setTime(this.state.time);
    }
  };

  componentWillMount() {
    this.setState({
      time: this.props.time
    });
  }

  componentDidMount() {
    this.timer = setInterval(this.upCount, 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div
        style={{
          color: "rgb(227, 159, 51)",
          textShadow: "2px 2px 5px rgba(227, 159, 51, 0.4)"
        }}
      >
        <p>
          Running for &nbsp;
          <span style={{ fontSize: "20px" }}>{this.props.time}</span>s
        </p>
      </div>
    );
  }
}
