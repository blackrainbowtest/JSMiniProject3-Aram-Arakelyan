import { useTranslation } from "react-i18next";
import s from "./CarouselItem.module.css";

export const CarouselItem = () => {
  const { t } = useTranslation();

  return <div className={s.container}>{t("commingSoon")}</div>;
};
