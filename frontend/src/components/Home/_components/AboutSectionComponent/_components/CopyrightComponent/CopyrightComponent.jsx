import { useTranslation } from "react-i18next";
import s from "./CopyrightComponent.module.css";

export const CopyrightComponent = () => {
  const { t } = useTranslation();

  return (
    <div className={s.copyright}>
      <div className={s.container}>
        <div className={s.row}>
          <p className={s.reserved}>{t("CopyRight")}</p>
        </div>
      </div>
    </div>
  );
};
