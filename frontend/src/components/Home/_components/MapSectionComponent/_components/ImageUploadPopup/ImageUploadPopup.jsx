import { useTranslation } from "react-i18next";
import s from "./ImageUploadPopup.module.css";
import { useCallback, useState } from "react";
import { DragAndDropFileUpload } from "./_components/DragAndDropFileUpload";
import { PopupTextInput } from "./_components/PopupTextInput";
import { PopupButton } from "./_components/PopupButton";
import { resizeImage } from "../../../../../../utils/image";
import { useDispatch } from "react-redux";
import { setError } from "../../../../../../features/Image/ImageSlice";

export const ImageUploadPopup = ({ handleChange, handleSubmit }) => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);

  const titleChangeHandle = (e) => {
    setText(e.target.value);
  };

  const dispatch = useDispatch();

  const submitButtonHandle = useCallback(
    async (e) => {
      e.stopPropagation();
      if (text.trim() && images.length) {
        try {
          const imagesArray = await Promise.all(
            images.map(async (file) => {
              if (!file) return null;

              const resizedImage = await new Promise((resolve) => {
                resizeImage(
                  file,
                  process.env.REACT_APP_BASE_SIZE,
                  process.env.REACT_APP_BASE_SIZE,
                  (resizedImage) => {
                    resolve(resizedImage);
                  }
                );
              });

              return resizedImage;
            })
          );
          handleSubmit(text.trim(), imagesArray.filter(Boolean));
        } catch (error) {
          dispatch(setError({ message: error }));
        }
      }
    },
    [handleSubmit, images, text, dispatch]
  );

  return (
    <div
      className={s.container}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={s.row}>
        <div className={s.titlePopup}>
          <h2>{t("imageAddTitle")}</h2>
        </div>
        <PopupTextInput text={text} titleChangeHandle={titleChangeHandle} />
        <DragAndDropFileUpload images={images} setImages={setImages} />
        <PopupButton
          handleSubmit={submitButtonHandle}
          handleChange={handleChange}
          text={text}
          images={images}
        />
      </div>
    </div>
  );
};
