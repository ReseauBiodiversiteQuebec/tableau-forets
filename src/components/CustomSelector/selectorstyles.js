import styled from "styled-components";
import { ListSubheader, TextField, Select } from "@mui/material";

export const CTextField = styled(TextField)`
  & .MuiOutlinedInput-input {
    padding: 10px 14px;
  }
  & legend {
    display: none;
  }
`;

export const CSelect = styled(Select)`
  & .MuiOutlinedInput-root,
  [class*="MuiInputBase-input-MuiOutlinedInput-input"] {
    padding: 8px 14px;
  }
  & legend {
    display: none;
  }
`;

export const CListSubheader = styled(ListSubheader)`
  &&& {
    box-sizing: border-box;
    line-height: 48px;
    list-style: none;
    color: rgba(0, 0, 0, 1);
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    padding-left: 16px;
    padding-right: 16px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #fff;
  }
`;
