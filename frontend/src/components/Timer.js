import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
    this.timer = null;
  }

  componentWillMount = () => {
    if (this.props.timerStart !== 0) {
      this.setState({
        // eslint-disable-next-line radix
        time: parseInt((Date.now() - this.props.timerStart) / 1000)
      });
    }
  };

  componentWillUnmount = () => {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  };

  render() {
    if (this.props.timerStart !== 0) {
      if (this.timer == null) {
        this.timer = setInterval(() => {
          this.setState({
            time: this.state.time + 1
          });
        }, 1000);
      }
    } else {
      if (this.timer != null) {
        this.setState({
          time: 0
        });
        clearInterval(this.timer);
        this.timer = null;
      }
    }
    return (
      <div
        style={{
          color: "rgb(227, 159, 51)",
          textShadow: "2px 2px 5px rgba(227, 159, 51, 0.4)"
        }}
      >
        <p>
          Running for &nbsp;
          <span style={{ fontSize: "20px" }}>{this.state.time}</span>s
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    timerStart: state.collect.timerStart,
    timerStop: state.collect.timerStop
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Timer)
);
