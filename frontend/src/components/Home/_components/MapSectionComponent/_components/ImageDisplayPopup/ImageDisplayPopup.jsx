import { useState } from "react";
import s from "./ImageDisplayPopup.module.css";

export const ImageDisplayPopup = ({ props }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === props.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? props.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className={s.container}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={s.row}>
        <div className={s.titlePopup}>
          <h2>{props?.text}</h2>
        </div>
        {props.images.length > 0 && (
          <div className={s.imageComponent}>
            <img
              src={URL.createObjectURL(props.images[currentImageIndex])}
              alt=''
            />
            <div className={s.buttonComponent}>
              <button onClick={previousImage}>Previous</button>
              <button onClick={nextImage}>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
