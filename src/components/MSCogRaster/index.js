import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { isNaN } from "lodash";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import chroma from "chroma-js";

function calcNdvi(nir, red) {
  return (nir - red) / (nir + red);
}
const scale = chroma
  .scale([
    "#E5E5E5",
    "#36648B",
    "#5CACEE",
    "#63B8FF",
    "#FFD700",
    "#FF0000",
    "#8B0000",
  ])
  .domain([0.001, 100]);

export default function GeoRaster({ url }) {
  const map = useMap();
  const layerRef = React.useRef(null);
  const [raster, setRaster] = useState();

  useEffect(() => {
    parseGeoraster(url).then((georaster) => {
      setRaster(georaster);
    });
  }, [url]);

  useEffect(() => {
    if (raster) {
      const layer = new GeoRasterLayer({
        attribution: "Planet",
        georaster: raster,
        debugLevel: 0,
        resolution: 96,
        pixelValuesToColorFn: (values) =>
          (values[0] === 0) | isNaN(values[0])
            ? "#ffffff00"
            : scale(values[0]).hex(),
      });

      layerRef.current = layer;
      const container = map;
      container.addLayer(layer);
    }
    return () => {
      if (map && layerRef.current) {
        map.removeLayer(layerRef.current);
      }
    };
  }, [raster, map]);

  return null;
}
