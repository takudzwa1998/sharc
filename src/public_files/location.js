import React from 'react';
import { useHistory } from "react-router-dom";
import DeckGL from '@deck.gl/react';
import {PathLayer} from '@deck.gl/layers';
import MapGL from 'react-map-gl';
import '../App.css';
import {StaticMap} from 'react-map-gl';
// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidGFrdWR6d2ExOTk4IiwiYSI6ImNrZzRoZXFrbjBqcWwyeHBqOTNhYTRuemEifQ.BmDagFwcUWOyVZOY_aSrbw';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 18.4696163,
  latitude: -33.9471633,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

// Data to be used by the LineLayer
const data = [
  {sourcePosition: [18.4696163, -33.9471633], targetPosition: [18.46980, -33.947300]}
];

function Location({data}) {
  const layers = [
    new PathLayer({
      id: 'path-layer',
      data,
      pickable: true,
      widthScale: 20,
      widthMinPixels: 2,
      visible: true,
      getPath: d => data,
      getColor: [Math.sqrt(72633 + 72633), 140, 0]
    })];
  const history = useHistory();
  const container_style={
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: 400
  }
    return(
        <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        getTooltip={({object}) => object && `Paths Covered`}
      >
      <button className="button" onClick={() => history.push("/")}>Back</button>

      <StaticMap
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
      </DeckGL>

    );

}

export default Location;
