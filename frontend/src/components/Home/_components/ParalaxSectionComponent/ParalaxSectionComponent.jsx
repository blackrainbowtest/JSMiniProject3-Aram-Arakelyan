import { useTranslation } from "react-i18next";
import background from "../../../../images/BG.jpg";

import s from "./style.module.css";

const ParalaxSectionComponent = () => {
  const { t } = useTranslation();

  return (
    <section id='Main' className={s.MainSection}>
      <img src={background} alt="bg" />
      <h2 className={s.mainText}>{t("productName")}</h2>
    </section>
  );
};

export { ParalaxSectionComponent };
