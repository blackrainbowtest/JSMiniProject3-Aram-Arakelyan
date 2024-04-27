import { useTranslation } from "react-i18next";
import s from "./ImageUploadPopup.module.css";
import { useState } from 'react';

export const ImageUploadPopup = ({handleChange, handleSubmit}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);

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
        <div className={s.bodyPopup}>
            <input type="text" />
            <input type="file" />
        </div>
        <div className={s.actionPopup}>
          <div className={`${s.actionBtn} ${s.actionSave}`} onClick={handleSubmit}>Save</div>
          <div className={`${s.actionBtn} ${s.actionCancel}`} onClick={handleChange}>Cancel</div>
        </div>
      </div>
    </div>
  );
};
