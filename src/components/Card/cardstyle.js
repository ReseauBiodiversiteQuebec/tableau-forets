import styled from "styled-components";
import { Container, colors } from "../../styles";

export const CardContainer = styled(Container)`
  padding: 0px;
  width: 100%;
`;

export const DetailContainer = styled(Container)`
  display: flex;
  border-left: 2px solid rgba(46, 72, 62, 0.4);
  padding-left: 5px;
  flex: 1;
  align-items: flex-start;
  color: ${colors.darkgreen};
`;

export const SmallText = styled(Container)`
  font-size: 8pt;
`;

export const BigText = styled(SmallText)`
  font-weight: bold;
  font-size: 14pt;
`;
