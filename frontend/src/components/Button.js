import React from "react";

let style = {
  norm: {
    boxShadow:
      "0 0px 5px rgba(0, 252, 219, 0.2), 0 0 40px rgba(0, 252, 219, 0.4) inset",
    color: "rgba(0, 252, 219, 1)",
    textShadow: "2px 2px 5px rgba(227, 159, 51, 0.5)"
  },
  hover: {
    boxShadow:
      "0 0px 5px rgba(227, 159, 51, 0.4), 0 0 40px rgba(227, 159, 51, 0.1) inset",
    color: "rgba(227, 159, 51, 1)",
    textShadow: "2px 2px 5px rgba(227, 159, 51, 0.5)"
  }
};

let styles = style.norm;

export class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: style.norm
    };
  }

  mouseEnter = () => {
    this.setState({ styles: style.hover });
  };

  mouseLeave = () => {
    this.setState({ styles: style.norm });
  };

  render() {
    return (
      <div
        className="hovarable"
        onMouseEnter={() => this.mouseEnter()}
        onMouseLeave={() => this.mouseLeave()}
      >
        <p
          style={{
            padding: "10px",
            textAlign: "center",
            ...this.state.styles,
            ...this.props.buttonTextStyles
          }}
        >
          {this.props.text}
        </p>
      </div>
    );
  }
}
