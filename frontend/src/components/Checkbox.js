import React, { Component } from "react";

export class Checkbox extends Component {
  render() {
    return (
      <div>
        <p>
          <input style={{ backgroundColor: "#252525" }} type="checkbox" />
          &nbsp;&nbsp;
          {this.props.label}
        </p>
      </div>
    );
  }
}
