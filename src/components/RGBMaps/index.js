import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import GeoRaster from "../RGBGeoRaster";

const MAP_STYLES = {
  position: "relative",
  width: "100%",
  height: "100vh",
};

const RGB_COG =
  "https://object-arbutus.cloud.computecanada.ca/bq-io/QC_LANDCOVER_2015_CEC_COG.tif";

const URL_2 =
  "https://object-arbutus.cloud.computecanada.ca/bq-io/io/CHELSA/climatologies/CHELSA_bio10_1981-2010_V.2.1.tif";

const cogPosition = [46, -79];

export default function App() {
  return (
    <>
      <MapContainer
        style={MAP_STYLES}
        center={cogPosition}
        zoom={5}
        maxZoom={25}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoRaster url={RGB_COG} />
      </MapContainer>
    </>
  );
}
