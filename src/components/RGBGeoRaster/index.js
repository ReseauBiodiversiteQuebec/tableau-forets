import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import { isNaN } from "lodash";
import chroma from "chroma-js";
import { palette } from "../../palette";

export default function GeoRaster({ url }) {
  const map = useMap();

  const layerRef = React.useRef(null);

  useEffect(() => {
    parseGeoraster(url).then((georaster) => {
      const { mins, noDataValue, ranges } = georaster;

      const layer = new GeoRasterLayer({
        attribution: "Planet",
        georaster,
        resolution: 128,
        debugLevel: 0,
        pixelValuesToColorFn: (values) => {
          const haveDataForAllBands = values.every(
            (value) => value || isNaN(value)
          );
          if (!haveDataForAllBands) {
            return "#00000000";
          }

          const [red] = values;

          const index = red > 256 ? red % 256 : red;
          const cc = palette[index];
          const color = chroma(cc[0], cc[1], cc[2]);
          //const color = chroma(red, green, blue);
          //console.log(color);
          //console.log(values);

          return color;
        },
      });

      layerRef.current = layer;
      const container = map;

      container.addLayer(layer);

      // map.fitBounds(layer.getBounds());
      // console.log("MAP CENTER", map.getCenter());
    });

    return () => map.removeLayer(layerRef.current);
  }, [map, url]);

  return null;
}
