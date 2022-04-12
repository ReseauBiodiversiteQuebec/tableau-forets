import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useSelector } from "react-redux";
import { colors } from "../../styles";
import _ from "underscore";

const MAP_STYLES = {
  position: "relative",
  width: "100%",
  height: "100vh",
};

const cogPosition = [54, -70];

export default function App() {
  const generalState = useSelector((state) => state.reducerState);

  const [RGBViewPort, setRGBViewPort] = React.useState({
    center: cogPosition,
    zoom: 5,
  });

  const shapeStyle = (properties) => {
    return {
      weight: 1,
      color:
        properties.category === "current" ? colors.current : colors.projected,
      opacity: 0.5,
      fillOpacity: 0.5,
    };
  };

  const onEachPolygon = (polygon, layer) => {
    const style = shapeStyle(polygon.properties);
    layer.setStyle(style);
  };

  return (
    <>
      <MapContainer
        style={MAP_STYLES}
        center={cogPosition}
        zoom={6}
        maxZoom={25}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
          key={_.uniqueId(JSON.stringify({ n: Math.random(), m: Date.now() }))}
          data={generalState.features}
          onEachFeature={onEachPolygon}
        />
      </MapContainer>
    </>
  );
}
