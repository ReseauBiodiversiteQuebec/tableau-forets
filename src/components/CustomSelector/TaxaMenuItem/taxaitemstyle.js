import styled from "styled-components";
import { Container, colors } from "../../../styles";

export const TaxaItemContainer = styled(Container)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const TaxaItemSubTitle = styled(Container)`
  width: 100%;
  color: ${colors.darkgreen};
  font-size: 8pt;
  align-items: flex-start;
`;

export const TaxaItemTitle = styled(TaxaItemSubTitle)`
  width: 100%;
  font-weight: bold;
  color: ${colors.darkgreen};
  font-size: 12px;
`;
