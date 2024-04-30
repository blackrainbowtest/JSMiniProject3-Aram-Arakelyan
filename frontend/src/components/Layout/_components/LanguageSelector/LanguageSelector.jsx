// LanguageSelector.js

import React, { useRef } from 'react';
import styles from './LanguageSelector.module.css';

export const LanguageSelector = ({ languages, onChange, isOpen, setIsOpen }) => {
  const anchorRef = useRef(null);

  const handleLanguageChange = (e, lng) => {
    setIsOpen(false);
    onChange(e, lng);
    localStorage.setItem("language", lng?.slug);
  };

  return (
    <div className={styles.languageSelector} ref={anchorRef}>
      <button
        className={styles.languageSelectorButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {console.log(languages)}
        {
          languages?.find(
            (lang) => localStorage.getItem("language") ?  lang.slug === localStorage.getItem("language") : lang.slug === 'am'
          )?.img
        }
      </button>
      {isOpen && (
        <div className={styles.languageDropdown}>
          {languages.map((language) => (
            <button
              key={language.id}
              className={styles.languageOption}
              onClick={(e) => handleLanguageChange(e, language)}
            >
              {language.img}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
