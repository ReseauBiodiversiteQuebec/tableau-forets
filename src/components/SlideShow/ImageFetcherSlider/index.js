import React from "react";
import "../slideshow.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ImageSlideCard from "../ImageSlideCard";

/**
 * Next and Before control
 * @param {*} param0
 * @returns
 */
const Control = ({ hide, onClick, icon, sence = "" }) => {
  return (
    <div
      className={`absolute slide-control ${sence} ${hide ? "hide" : ""}`}
      onClick={() => onClick()}
    >
      {icon}
    </div>
  );
};

/**
 *
 * @param {*} param0
 * @returns
 */
function ImageFetcherSlider({
  image,
  onNext = () => {},
  onBack = () => {},
  length = -1,
  card,
  onSearch = (scientificName) => {},
}) {
  return (
    <div className={`img-slider-container`}>
      <div style={{ padding: "5px 25px", height: "100%" }}>
        <ImageSlideCard image={image} card={card} onSearch={onSearch} />
      </div>
      <Control
        sence={"next-arrow"}
        hide={length === 1}
        onClick={() => onNext()}
        icon={<NavigateNextIcon />}
      />

      <Control
        sence={"before-arrow"}
        hide={length === 1}
        onClick={() => onBack()}
        icon={<NavigateBeforeIcon />}
      />
    </div>
  );
}

export default ImageFetcherSlider;
