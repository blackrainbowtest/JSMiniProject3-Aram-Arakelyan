import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import s from "./SubscribeComponent.module.css";

export const SubscribeComponent = () => {
  const { t } = useTranslation();

  return (
    <div className={s.container}>
      <div className={s.row}>
        <div className={s.colM}>
          <Link className='logoFooter' to={"/"}>
            {t("Logo")}
          </Link>
        </div>
        <div className={s.colM9}>
          <form className={s.newslatterForm}>
            <input
              className={s.ente}
              placeholder='Enter your email'
              type='text'
              name='Enter your email'
            />
            <button className={s.subsBtn}>Sbscribe Now</button>
          </form>
        </div>
      </div>
    </div>
  );
};
