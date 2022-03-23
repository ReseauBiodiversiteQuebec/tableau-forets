import React from "react";
import _ from "underscore";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { CSelect } from "../selectorstyles";

export default function Selector(props) {
  const { onValueChange, selectorId, selectorList, value = [] } = props;

  const onChange = (event) => {
    onValueChange({ selectorId: selectorId, value: event.target.value });
  };

  return (
    <div
      className="selector"
      style={{ width: "100%" }}
      onClick={(event) => event.stopPropagation()}
    >
      <FormControl sx={{ width: "100%", p: 1, m: 0 }}>
        <CSelect displayEmpty value={value} onChange={onChange}>
          {selectorList.map((element) => {
            return (
              <MenuItem
                key={_.uniqueId(JSON.stringify(element))}
                value={element.option}
              >
                {element.value}
              </MenuItem>
            );
          })}
        </CSelect>
      </FormControl>
    </div>
  );
}
