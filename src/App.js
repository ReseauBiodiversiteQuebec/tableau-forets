import React from "react";
import "./styles.css";
import { AppContainer, LeftContent, GlobalStyle } from "./appStyles.js";
import Sidebar from "./components/Sidebar";
import { Provider } from "react-redux";
import store from "./store/globalstore";
import RightContentGroup from "./components/RightContentGroup";

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <LeftContent>
          <Sidebar />
        </LeftContent>
        <RightContentGroup />
      </AppContainer>
      <GlobalStyle />
    </Provider>
  );
}
