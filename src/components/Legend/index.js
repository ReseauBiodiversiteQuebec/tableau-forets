import React, { useEffect } from "react";
import { buildLocation } from "../../utils/helper";
import _ from "underscore";
import {
  LegendItemContainer,
  LegendItemColorContainer,
  LegendItemTextContainer,
  CustomLegend,
} from "./legendstyles";
import "./Legend.css";

const LegendItem = ({ color = "red", text = "" }) => {
  return (
    <LegendItemContainer>
      <LegendItemColorContainer color={color} />
      <LegendItemTextContainer>
        <span>{text}</span>
      </LegendItemTextContainer>
    </LegendItemContainer>
  );
};

const Legend = (props) => {
  const {
    id = 0,
    items = [],
    absolute,
    location = "",
    top = 0,
    bottom = 0,
    left = 0,
    right = 0,
    colorClass = "",
    title,
  } = props;

  useEffect(() => {}, []);

  let customclass = "";

  customclass += (absolute ? "absolute " : "") + " ";
  customclass += location + " legend-amin ";

  let style = buildLocation(location, top, right, left, bottom);

  return (
    <CustomLegend className={`${customclass} ${colorClass}`} style={style}>
      {items.map((item) => {
        return (
          <LegendItem
            id={id}
            key={_.uniqueId({ n: Math.random(), m: Date.now() })}
            color={item.color}
            text={item.text}
          />
        );
      })}
      {title}
    </CustomLegend>
  );
};

export default Legend;
