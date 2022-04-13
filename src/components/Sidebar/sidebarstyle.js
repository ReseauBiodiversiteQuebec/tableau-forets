import styled from "styled-components";
import { colors, Container } from "../../styles";
import "../../css/external/common.css";

export const SiderContainer = styled(Container)`
  color: ${colors.white};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${colors.white};
`;

export const SiderTitleContainer = styled(Container)`
  color: white;
  width: 100%;
`;

export const Title = styled.div`
  width: 100%;
  display: table;
  padding: 0.5em 0;
  background-color: ${colors.green};
  color: ${colors.white};
  align-items: center;
`;

export const Description = styled.div`
  background-color: #7bb5b1;
  width: 100%;
  color: #fff;
  padding: 12px;
  border-radius: 0;
  margin: 0 0 20px;
  align-items: center;
`;
