import React, { Component } from "react";

export class Checkbox extends Component {
  render() {
    return (
      <div>
        <label className="container">
          <input
            type="checkbox"
            checked={this.props.checked}
            onClick={this.props.onClick}
            onChange={() => {}}
          />
          {this.props.label}
          <span className="checkmark" />
        </label>
      </div>
    );
  }
}
