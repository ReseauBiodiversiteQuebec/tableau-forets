import React, { useState, useEffect } from "react";
import _ from "underscore";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { CSelect } from "../selectorstyles";

export default function Selector(props) {
  const { onValueChange, selectorId, selectorList = [] } = props;
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
    onValueChange({ selectorId: selectorId, value: event.target.value });
  };

  useEffect(() => {
    setValue(selectorList.length > 0 ? selectorList[0].option : "");
  }, []);

  return (
    <div style={{ width: "100%" }} onClick={(event) => event.stopPropagation()}>
      <FormControl sx={{ width: "100%" }}>
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
