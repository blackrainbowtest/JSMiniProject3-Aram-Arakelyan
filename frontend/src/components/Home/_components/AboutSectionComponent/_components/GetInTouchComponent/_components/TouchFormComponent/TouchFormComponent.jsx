import { useTranslation } from "react-i18next";
import s from "./TouchFormComponent.module.css";

export const TouchFormComponent = () => {
  const { t } = useTranslation();
  return (
    <div className={s.mainForm}>
      <div className={s.row}>
        <div className={s.colMd12}>
          <input
            className={s.contactus}
            placeholder={t('Name')}
            type='type'
            name=' Name'
          />
        </div>
        <div className={s.colMd12}>
          <input
            className={s.contactus}
            placeholder={t('PhoneNumber')}
            type='type'
            name='Phone Number'
          />
        </div>
        <div className={s.colMd12}>
          <input
            className={s.contactus}
            placeholder={t('Email')}
            type='type'
            name='Email'
          />{" "}
        </div>
        <div className={s.colMd12}>
          <textarea
            className={s.textarea}
            placeholder={t('Message')}
            type='type'
            message='Name'
          ></textarea>
        </div>
        <div className={s.colMd12}>
          <button className={s.sendBtn} onClick={(e) => alert('Soon')}>{t('SendNow')}</button>
        </div>
      </div>
    </div>
  );
};
