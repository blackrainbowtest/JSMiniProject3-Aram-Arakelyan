import { useTranslation } from "react-i18next";

import s from "./PopupButton.module.css";

export const PopupButton = ({ handleSubmit, handleChange, text, images }) => {
  const { t } = useTranslation();

  return (
    <div className={s.actionPopup}>
      <div
        className={`${s.actionBtn} ${s.actionSave}`}
        onClick={(e) => handleSubmit(e, { text, images })}
      >
        {t('save')}
      </div>
      <div
        className={`${s.actionBtn} ${s.actionCancel}`}
        onClick={handleChange}
      >
        {t('cancel')}
      </div>
    </div>
  );
};
