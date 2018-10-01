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
    }
  };

  componentDidMount() {
    this.timer = setInterval(this.upCount, 1000);
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <p>
          Running for &nbsp;
          <span style={{ fontSize: "20px" }}>{this.state.time}</span>s
        </p>
      </div>
    );
  }
}
