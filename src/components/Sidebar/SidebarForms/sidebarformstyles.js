import styled from "styled-components";
import { SiderContainer } from "../sidebarstyle";
import { colors } from "../../../styles";

export const SidebarFormContainer = styled(SiderContainer)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 30px;
  max-height: 80vh;

  @media (max-height: 960px) {
    overflow-y: scroll;
  }
`;

export const WrapperContainer = styled(SiderContainer)`
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
  height: fit-content;
`;

export const Spiner = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SelectorTitle = styled.div`
  font-weight: bold;
  color: ${colors.darkgreen};
  font-size: 12pt;
  padding: 0.5em 0;
`;
