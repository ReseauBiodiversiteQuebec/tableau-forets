import React, { useRef, useState } from "react";
import ImageFetcherSlider from "../ImageFetcherSlider";

function ImageFetcher({ scientificNames = [], height, name, dataProvider }) {
  const specieName = useRef(name);
  const [state, setState] = useState({
    image: undefined,
    card: undefined,
  });

  const nextImage = () => {};

  const previousImage = () => {};

  const onSearch = (scientificName) => {};

  if (specieName.current !== name) {
    specieName.current = name;
    if (dataProvider)
      dataProvider({ name })
        .then((response) => {
          setState((old) => {
            return {
              ...old,
              image: response.image,
              card: response.data,
            };
          });
        })
        .catch((err) => {
          setState((old) => {
            return {
              ...old,
              image: undefined,
            };
          });
        });
  }

  return (
    <>
      {state.card && (
        <ImageFetcherSlider
          height={height}
          image={state.image}
          onNext={nextImage}
          onBack={previousImage}
          length={scientificNames.length}
          card={state.card}
          onSearch={onSearch}
        />
      )}
    </>
  );
}

export default ImageFetcher;
