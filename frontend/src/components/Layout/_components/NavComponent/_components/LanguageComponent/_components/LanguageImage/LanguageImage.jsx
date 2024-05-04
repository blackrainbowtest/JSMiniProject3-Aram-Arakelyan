import { useTranslation } from "react-i18next";
import s from "./LanguageImage.module.css";

export const LanguageImage = ({ lng, callback }) => {
  const { t } = useTranslation();

  const handleClick = callback ? (e) => callback(e, lng) : undefined;

  return (
    <div className={s.lng} onClick={handleClick}>
      {t(lng?.slug)}
      {lng?.img}
    </div>
  );
};
