import React from "react";
import { FloatingBtnContainer } from "./floatingbtnstyles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";

export const FloatingBtn = (props) => {
  return (
    <FloatingBtnContainer onClick={props.onClick}>
      <IconButton aria-label="delete" size="large">
        <SettingsIcon fontSize="inherit" />
      </IconButton>
    </FloatingBtnContainer>
  );
};
