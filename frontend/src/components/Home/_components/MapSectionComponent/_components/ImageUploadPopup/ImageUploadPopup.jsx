import { useTranslation } from "react-i18next";
import s from "./ImageUploadPopup.module.css";
import { useState } from "react";
import { DragAndDropFileUpload } from "./_components/DragAndDropFileUpload";
import { PopupTextInput } from "./_components/PopupTextInput";
import { PopupButton } from "./_components/PopupButton";

export const ImageUploadPopup = ({ handleChange, handleSubmit }) => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);

  const titleChangeHandle = (e) => {
    setText(e.target.value);
  };

  const submitButtonHandle = (e) => {
    e.stopPropagation()
    if (text.trim() && images.length) {
      handleSubmit(text.trim(), images)
    }
  }

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
