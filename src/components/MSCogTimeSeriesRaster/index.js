import React, { useEffect, useState } from "react";
import { useLeaflet, GridLayer } from "react-leaflet";
import { isNaN } from "lodash";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import chroma from "chroma-js";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentLayer } from "../../store/reducers/reducer";

const scale = chroma.scale(["#E5E5E5", "#36648B", "#5CACEE", "#63B8FF", "#FFD700", "#FF0000", "#8B0000"]).domain([0.001, 100]);

export default function GeoRaster({url}) {
  const { map, layerContainer } = useLeaflet();
  const layerRef = React.useRef(null);
  const [raster, setRaster] = useState();

  useEffect(() => {
    parseGeoraster(url).then((georaster) => {
      setRaster(georaster);
    });
    return () => {
    };
  }, [url, map]);

  useEffect(() => {
    if (raster) {
      let layerId=Math.random();
      const layer = new GeoRasterLayer({
        attribution: "Planet",
        type: "coglayer",
        layer_id:layerId,
        georaster: raster,
        debugLevel: 0,
        resolution: 128,
        pixelValuesToColorFn: values => values[0] === 0 | isNaN(values[0]) ? '#ffffff00' : scale(values[0]).hex(),
      });
      layer.on('load', (event) =>{
        setTimeout(()=>{
          map.eachLayer(function (layer) {
              if(layer.options.type==='coglayer' && layer.options.layer_id !== layerId){
                map.removeLayer(layer);
              }
            });
        },100)
      })
      const container = layerContainer || map;
      layerRef.current = layer;
      container.addLayer(layer);
    }
    return () => {
    };
  }, [raster, map]);

  return null;
}
