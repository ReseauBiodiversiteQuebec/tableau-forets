import React from "react";
import "leaflet/dist/leaflet.css";
import { Map, TileLayer } from "react-leaflet";
import MSCogTimeSeriesRaster from "../MSCogTimeSeriesRaster";
import { useSelector } from "react-redux";
import _ from "underscore";

const MAP_STYLES = {
  position: "relative",
  width: "100%",
  height: "100vh",
  padding: "0",
};


export default function App() {
  const generalState = useSelector((state) => state.reducerState);

  return (
    <>
      <Map
        // ref={cogRGBMapRef}
        style={MAP_STYLES}
        center={[49,-72]}
        zoom={6}
        maxZoom={25}
      > 
        <TileLayer
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="http://osm.org/copyright">Stamen</a> contributors'
        />
        <MSCogTimeSeriesRaster key={_.uniqueId(JSON.stringify({ n: Math.random(), m: Date.now() }))} url={generalState.cog_uri} />
      </Map>
    </>
  );
}
