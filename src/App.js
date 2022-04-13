import React, { useState } from "react";
import "./styles.css";
import { AppContainer, LeftContent, GlobalStyle } from "./appStyles.js";
import Sidebar from "./components/Sidebar";
import { Provider } from "react-redux";
import store from "./store/globalstore";
import RightContentGroup from "./components/RightContentGroup";
import useWindowDimensions from "./hooks/useWindowDimensions";
import SlideScreen from "./components/SlideScreen";
import { FloatingBtn } from "./components/FloatingBtn";

export default function App() {
  const { height, width } = useWindowDimensions();
  const [menuState, setMenuState] = useState({
    animate: true,
    visibility: true,
  });

  const showMenu = () => {
    setMenuState((oldState) => ({
      visibility: oldState.visibility,
      animate: !oldState.animate,
    }));
  };

  const slidescreen = {
    showMenuFn: showMenu,
    animate: menuState.animate,
    visibility: width > 768 ? true : menuState.visibility && menuState.animate,
    enableAnimation: width < 768,
  };

  return (
    <Provider store={store}>
      <AppContainer>
        <SlideScreen onClick={() => showMenu()} {...slidescreen}>
          <LeftContent>
            <Sidebar />
          </LeftContent>
        </SlideScreen>
        <RightContentGroup width={width} height={height} />
        {width < 768 && <FloatingBtn onClick={() => showMenu()} />}
      </AppContainer>
      <GlobalStyle />
    </Provider>
  );
}
