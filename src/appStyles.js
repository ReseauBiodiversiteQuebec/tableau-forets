import styled, { createGlobalStyle } from "styled-components";
import { Container } from "./styles";

export const GlobalStyle = createGlobalStyle`
  body { 
    & [class*="MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper"]::-webkit-scrollbar{
     /*  display: none; */
     overflow: scroll;
     width: 5px
    
    }

    & [class*="MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper"]::-webkit-scrollbar-thumb{
     
      background-color: darkgrey;
      border-radius: 5px;
    }

    & [class*="MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper"]{
      //-ms-overflow-style: none; /* for Internet Explorer, Edge */
      //scrollbar-width: none; /* for Firefox */
      //overflow-y: scroll; 
      & [class*="MuiButtonBase-root-MuiMenuItem-root"] {
        padding: 2px 16px
      }
    } 

  }
  
  [class*="selector"] {
    width: 100%;
    [class*="MuiOutlinedInput-input"] {
    padding: 8px 16px;
  }
  }

  `;

export const AppContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  padding: 0;
  overflow: hidden;
  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`;

export const LeftContent = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 0;
  background-color: transparent;
  overflow-y: hidden;
`;

export const RightContent = styled(LeftContent)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;

    & .leaflet-container {
      width: 100%;
      height: 100vh;
    }
  }
`;
