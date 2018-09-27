/// app.js
import React, {Component} from 'react';
import {StaticMap} from 'react-map-gl';
import DeckGL, {IconLayer} from 'deck.gl';

// Set your mapbox access token here
import {MAPBOX_ACCESS_TOKEN} from '../constants/index';

let data=[{"name" :"You Are Here! A*****le", "coordinates":[null,null]}];

let layer = new IconLayer({
  id: 'icon-layer',
  data,
  pickable: true,
  iconAtlas: 'dependencies/pics/pin_small.png',
  iconMapping: {
    marker: {
      x: 0,
      y: 0,
      width: 128,
      height: 128,
      anchorY: 128,
      anchorX: 64,
      mask: false
    }
  },
  sizeScale: 15,
  getPosition: d => d.coordinates,
  getIcon: d => 'marker',
  getSize: d => 5,
  getColor: d => [Math.sqrt(d.exits), 140, 0],
  // onHover: ({object}) => setTooltip(`${object.name}\n${object.coordinates}`)
});

export default class PositionMap extends Component {
  componentWillUpdate(){
    // layer.props.data[0].coordinates = [this.props.location.longitude, this.props.location.latitude]
    data=[{"name" :"You Are Here", "coordinates":[this.props.location.longitude, this.props.location.latitude]}];
    layer = new IconLayer({
      id: 'icon-layer',
      data,
      pickable: true,
      iconAtlas: 'dependencies/pics/pin_small.png',
      iconMapping: {
        marker: {
          x: 0,
          y: 0,
          width: 128,
          height: 128,
          anchorY: 128,
          anchorX: 64,
          mask: false
        }
      },
      sizeScale: 15,
      getPosition: d => d.coordinates,
      getIcon: d => 'marker',
      getSize: d => 5,
      getColor: d => [Math.sqrt(d.exits), 140, 0],
      // onHover: ({object}) => setTooltip(`${object.name}\n${object.coordinates}`)
    });
  }

  INITIAL_VIEW_STATE = {
      longitude: this.props.location.longitude,
      latitude: this.props.location.latitude,
      zoom: 16,
      minZoom: 5,
      maxZoom: 15,
      pitch: 40.5,
      bearing: -27.396674584323023
  };

  render() {
    const {viewState, controller = true, baseMap = true} = this.props;

    return (
      <DeckGL
        layers={[layer]}
        initialViewState={this.INITIAL_VIEW_STATE}
        viewState={viewState}
        controller={controller}
      >
        {baseMap && (
          <StaticMap
            reuseMaps
            mapStyle="mapbox://styles/mapbox/dark-v9"
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          />
        )}
      </DeckGL>
    );
  }
}