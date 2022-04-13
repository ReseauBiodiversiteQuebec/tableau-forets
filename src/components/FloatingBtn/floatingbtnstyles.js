import styled from "styled-components";
import { colors } from "../../styles";
import IconButton from "@mui/material/IconButton";

export const FloatingBtnContainer = styled.div`
  background-color: ${colors.green};
  position: absolute;
  z-index: 1000;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50px;
  bottom: 50px;
`;
