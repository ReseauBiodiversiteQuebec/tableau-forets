import React, { useState } from "react";
import _ from "underscore";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { CListSubheader, CSelect } from "../selectorstyles";
import TaxaMenuItem from "../TaxaMenuItem";

export default function GroupedSelect(props) {
  const { elementList = [], onValueChange, selectorId, value } = props;
  const handleChange = (event) => {
    onValueChange({ selectorId: selectorId, value: event.target.value });
  };

  /*React.useEffect(() => {
    setValue(elementList.length > 0 ? elementList[0].value : "");
    setOption(elementList.length > 0 ? elementList[0].option : "");
  }, [elementList]);*/

  let group = "";
  return (
    <div
      className="selector"
      style={{ width: "100%" }}
      onClick={(event) => event.stopPropagation()}
    >
      <FormControl sx={{ width: "100%", p: 1, m: 0 }}>
        <CSelect displayEmpty value={value} onChange={handleChange}>
          {elementList.map((element) => {
            return (
              <MenuItem
                key={_.uniqueId(JSON.stringify(element))}
                value={element.option}
              >
                <TaxaMenuItem {...element} />
              </MenuItem>
            );
          })}
        </CSelect>
      </FormControl>
    </div>
  );
}
