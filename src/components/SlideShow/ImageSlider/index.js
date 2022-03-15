import React, { useState } from "react";
import "../slideshow.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import hash from "object-hash";

const NoPictureMessage = ({ show }) => {
  return (
    <div
      className={`img-slider-container include-borders text-primary-dark-green gray-background ${
        show ? "" : "hide"
      }`}
      style={{ width: "90%" }}
    >
      Pas d'Image
    </div>
  );
};

function ImageSlider({ images = [], height = "100%", width = "100%" }) {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent((old) => (current === length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setCurrent((old) => (current === 0 ? length - 1 : current - 1));
  };

  return length > 0 ? (
    <div className={`img-slider-container ${length < 1 ? "hide" : ""}`}>
      {images.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide-img active" : "slide-img"}
            key={hash({ n: Math.random(), m: Date.now() })}
          >
            {index === current && (
              <img
                key={hash({ n: Math.random(), m: Date.now(), t: "jjj" })}
                src={slide.thumburl}
                alt="speciesimage"
                className="slideImage"
                style={{ width: width, height: height }}
              />
            )}
          </div>
        );
      })}
      <div
        className={`next-arrow absolute slide-control ${
          length === 1 ? "hide" : ""
        }`}
        onClick={() => nextSlide()}
      >
        <NavigateNextIcon />
      </div>
      <div
        className={`before-arrow absolute slide-control ${
          length === 1 ? "hide" : ""
        }`}
        onClick={() => prevSlide()}
      >
        <NavigateBeforeIcon />
      </div>
      <div className={`dots-container ${length === 1 ? "hide" : ""}`}>
        {images.map((slide, index) => {
          return (
            <div
              key={hash({ n: Math.random(), m: Date.now(), h: "ll" })}
              className={`dot ${index === current ? "dot-active" : ""}`}
            ></div>
          );
        })}
      </div>
    </div>
  ) : (
    <NoPictureMessage show={length === 0} />
  );
}

export default ImageSlider;
