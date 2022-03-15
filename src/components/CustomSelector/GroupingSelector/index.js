import React, { useState } from "react";
import _ from "underscore";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { CListSubheader, CSelect } from "../selectorstyles";
import TaxaMenuItem from "../TaxaMenuItem";

export default function GroupedSelect(props) {
  const { elementList = [], onValueChange, selectorId } = props;
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    onValueChange({ selectorId: selectorId, value: event.target.value });
  };

  React.useEffect(() => {
    setValue(elementList.length > 0 ? elementList[1].option : "");
  }, [elementList]);

  let group = "";
  return (
    <div style={{ width: "100%" }} onClick={(event) => event.stopPropagation()}>
      <FormControl sx={{ width: "100%" }}>
        <CSelect
          displayEmpty
          value={value}
          onChange={handleChange}
          native={false}
          renderValue={(selected) => {
            return selected;
          }}
        >
          {elementList.map((element) => {
            if (element.group_fr !== group) {
              group = element.group_fr;
              return (
                <CListSubheader key={_.uniqueId(JSON.stringify(element))}>
                  {element.group_fr}
                </CListSubheader>
              );
            } else {
              return (
                <MenuItem
                  key={_.uniqueId(JSON.stringify(element))}
                  value={element.option}
                >
                  <TaxaMenuItem {...element} />
                </MenuItem>
              );
            }
          })}
        </CSelect>
      </FormControl>
    </div>
  );
}
