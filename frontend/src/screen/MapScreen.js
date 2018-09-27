import React, { Component } from "react";
import Map from "../components/Map";

export default class MapScreen extends Component {
  render() {
    console.log(this.props.data);
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Map
          viewState={{
            longitude: this.props.data.longitude,
            latitude: this.props.data.latitude,
            zoom: 16,
            minZoom: 5,
            maxZoom: 15,
            pitch: 40.5,
            bearing: -27.396674584323023
          }}
        />
      </div>
    );
  }
}
