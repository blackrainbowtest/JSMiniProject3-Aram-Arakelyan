import { useTranslation } from 'react-i18next';
import s from './PopupTextInput.module.css'

export const PopupTextInput = ({titleChangeHandle, text}) => {
    const { t } = useTranslation();

    return (
        <div className={s.bodyTextPopup}>
          <input type='text' onChange={titleChangeHandle} value={text} className={s.textPopup} id='textPopup' placeholder={''} />
          <label htmlFor="textPopup">{t('textPopup')}</label>
        </div>
    )
}