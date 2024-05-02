import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import s from "./ImageDisplayPopup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getImageByID } from "../../../../../../features/Image/ImageAPI";

export const ImageDisplayPopup = ({ props }) => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const dispatch = useDispatch();
  const markerImages = useSelector((state) => state?.image?.data);
  const loading = useSelector((state) => state?.image?.loading);
  const loadingMain = useSelector((state) => state?.main?.loading);
  const loadingCoordinates = useSelector(
    (state) => state?.coordinates?.loading
  );

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === markerImages?.images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? markerImages?.images?.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    dispatch(getImageByID(props?._id)).then((res) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return loading || loadingCoordinates || loadingMain ? null : (
    <div
      className={s.container}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={s.row}>
        <div className={s.titlePopup}>
          <h2>{markerImages?.text}</h2>
        </div>
        {markerImages?.images?.length > 0 && (
          <div className={s.imageComponent}>
            <img
              src={`data:image/jpeg;base64,${markerImages.images[currentImageIndex]}`}
              alt=''
            />
            {markerImages?.images?.length > 1 && (
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
