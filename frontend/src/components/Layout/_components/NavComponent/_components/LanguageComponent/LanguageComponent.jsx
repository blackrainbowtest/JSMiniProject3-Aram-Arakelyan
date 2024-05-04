import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { changeLanguage } from "i18next";

import imgAM from "../../../../../../images/lng/am.png";
import imgEN from "../../../../../../images/lng/en.png";
import imgRU from "../../../../../../images/lng/ru.png";
import imgFR from "../../../../../../images/lng/fr.png";

import { LanguageSelector } from "./_components/LanguageSelector";
import { LanguageImage } from "./_components/LanguageImage";

import s from "./LanguageComponent.module.css";
import { Link } from "react-router-dom";

export const LanguageComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLng, setActiveLng] = useState(null);

  const anchorRef = useRef(null);

  const languages = useMemo(
    () => [
      {
        id: 1,
        slug: "am",
        img: <img src={imgAM} alt='Armenian' />,
      },
      {
        id: 2,
        slug: "en",
        img: <img src={imgEN} alt='English' />,
      },
      {
        id: 3,
        slug: "ru",
        img: <img src={imgRU} alt='Russian' />,
      },
      {
        id: 4,
        slug: "fr",
        img: <img src={imgFR} alt='French' />,
      },
    ],
    []
  );

  // Get active language from localStorage on component mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    const languageFromStorage = languages.find(
      (lang) => lang.slug === storedLanguage
    );
    setActiveLng(
      languageFromStorage || languages.find((lang) => lang.slug === "am")
    );
  }, [languages]);

  const headerLanguageChangeHandle = useCallback((_, lng) => {
    setIsOpen(false);
    changeLanguage(lng.slug);
    setActiveLng(lng)
    localStorage.setItem("language", lng.slug);
  }, []);

  const languageActionClickHandler = useCallback((e) => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <Link
      className={s.nav_link}
      ref={anchorRef}
      onClick={languageActionClickHandler}
    >
      <LanguageImage lng={activeLng} />
      <LanguageSelector
        languages={languages}
        onChange={headerLanguageChangeHandle}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
    </Link>
  );
};
