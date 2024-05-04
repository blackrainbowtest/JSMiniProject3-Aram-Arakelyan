// LanguageSelector.js

import s from "./LanguageSelector.module.css";
import { ClickOut } from "../../../../../../../_common/ClickOut/ClickOut";
import { LanguageImage } from "../LanguageImage/LanguageImage";

export const LanguageSelector = ({
  languages,
  onChange,
  isOpen,
  setIsOpen,
}) => {
  // outside click logic
  const handleClickOutside = () => {
    setIsOpen(false);
  };

  // self click stub
  const handleSelfClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return isOpen ? (
    <div className={s.lngSelectComponent} onClick={handleSelfClick}>
      <ClickOut callback={handleClickOutside}>
        {languages.map(
          (lng, i) =>
            lng.slug !== localStorage.getItem("language") && (
              <LanguageImage key={i} lng={lng} callback={onChange} />
            )
        )}
      </ClickOut>
    </div>
  ) : null;
};
