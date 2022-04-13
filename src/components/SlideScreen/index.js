import React from "react";
import "./slidescreen.css";

function SlideScreen(props) {
  const {
    children,
    animate = false,
    showMenuFn = () => "",
    visibility = true,
    enableAnimation = false,
  } = props;

  const clicked = (event) => {
    if (enableAnimation) showMenuFn();
  };

  return (
    <div
      className={`sidebar-container-dashboard ${
        visibility ? "" : "display-none"
      }`}
      onClick={clicked}
    >
      <div
        className={`sidebar-container-w ${
          animate ? "animate-sidebar" : "close-menu"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default SlideScreen;
