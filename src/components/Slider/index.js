import React from "react";
import Slider from "@mui/material/Slider";
import { SliderContainer } from "./sliderstyle";
import { colors } from "../../styles";


function valuetext(value) {
  return `${value}`;
}

function CustomSlider(props) {
  const { values, notifyChange, selectorId, value } = props;
  return (
    <SliderContainer>
      <Slider
        aria-label="Restricted values"
        getAriaValueText={valuetext}
        step={null}
        marks={values}
        track={false}
        sx={{ color: colors.green, track:{display:"none"} }}
        value={value}
        valueLabelFormat={value => <div>{2020+(Math.round(0.1*value *13))}</div>}
        valueLabelDisplay="on"
        onChangeCommitted={(e, value) => {
          const element = values.filter((item, i) => item.value === value);
          notifyChange({selectorId, value:value});
        }}
      />
    </SliderContainer>
  );
}

export default CustomSlider;
