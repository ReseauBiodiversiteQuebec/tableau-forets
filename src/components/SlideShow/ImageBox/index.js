import React from "react";
import "../slideshow.css";

/**
 * Box shown with an image
 * @param {*} param0
 * @returns
 */
export const ImageBox = ({ image, width, height }) => {
  return (
    <div className={"slide-img active"}>
      <img
        src={image.thumburl}
        alt="speciesimage"
        className="slideImage"
        style={{ width: width, height: height }}
      />
    </div>
  );
};

/**
 * Box shown when there is no image
 * @param {*} param0
 * @returns
 */
export const NoImageBox = ({ width, height }) => {
  return (
    <div
      className={
        "no-image include-borders text-primary-dark-green gray-background"
      }
      style={{ height: height }}
    >
      Pas d'Image
    </div>
  );
};
