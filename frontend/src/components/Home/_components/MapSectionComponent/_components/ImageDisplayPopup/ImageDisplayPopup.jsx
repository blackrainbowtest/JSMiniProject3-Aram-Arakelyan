import { useTranslation } from "react-i18next";
import { useState } from "react";
import s from "./ImageDisplayPopup.module.css";

export const ImageDisplayPopup = ({ props }) => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === props?.images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? props?.images?.length - 1 : prevIndex - 1
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
        {props?.images?.length > 0 && (
          <div className={s.imageComponent}>
            <img src={props.images[currentImageIndex]} alt='' />
            {props?.images?.length > 1 && (
              <div className={s.buttonComponent}>
                <button onClick={previousImage}>{t("Previous")}</button>
                <button onClick={nextImage}>{t("Next")}</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
