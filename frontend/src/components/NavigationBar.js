import React, { Component } from "react";
import * as Routes from "../routes/Routes";

const NavigationIcon = props => {
  return <div>{props.name}</div>;
};

const navigations = [
  {
    name: "Collect Data",
    link: Routes.COLLECT_DATA_LINK
  },
  {
    name: "Graph View",
    link: Routes.GRAPH_VIEW_DATA_LINK
  },
  {
    name: "Map View",
    link: Routes.MAP_VIEW_LINK
  },
  {
    name: "Sensor Data",
    link: Routes.SENSOR_DATA_LINK
  }
];

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0
    };
  }

  setActive = index => {
    this.setState({
      active: index
    });
    this.props.history.push(navigations[index].link);
  };

  navigationRender = () => {
    return navigations.map((nav, index) => {
      if (this.state.active === index) {
        return (
          <div
            key={index}
            className="hovarable"
            style={{
              padding: "5px",
              color: "rgb(227, 159, 51)",
              textShadow: "2px 2px 5px rgba(227, 159, 51, 0.5)"
            }}
            onClick={() => {
              this.setActive(index);
            }}
          >
            <NavigationIcon name={nav.name} />
          </div>
        );
      } else {
        return (
          <div
            className="hovarable"
            key={index}
            style={{
              padding: "5px",
              color: "#00fcdb",
              textShadow: "2px 2px 5px rgba(0, 252, 219, 0.4)"
            }}
            onClick={() => {
              this.setActive(index);
            }}
          >
            <NavigationIcon name={nav.name} />
          </div>
        );
      }
    });
  };

  render() {
    return (
      <div
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "60px",
          backgroundColor: "#252525",
          boxShadow:
            "0 0px 5px rgba(0, 252, 219, 0.2), 0 0 40px rgba(0, 252, 219, 0.1) inset",
          border: "1px solid rgba(0, 252, 219, 0.2)"
        }}
      >
        <div
          style={{
            display: "flex",
            paddingRight: "5px",
            justifyContent: "flex-end",
            alignItems: "center",
            height: "100%"
          }}
        >
          <div
            style={{
              display: "flex",
              width: "70%",
              flexDirection: "row",
              justifyContent: "flex-end",
              justifySelf: "end"
            }}
          >
            {this.navigationRender()}
          </div>
        </div>
      </div>
    );
  }
}
