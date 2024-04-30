import { useRef, useState } from "react";
import { changeLanguage } from "i18next";

import imgAM from "../../../../images/lng/am.png";
import imgEN from "../../../../images/lng/en.png";
import imgRU from "../../../../images/lng/ru.png";
import imgFR from "../../../../images/lng/fr.png";

import { LanguageSelector } from "../LanguageSelector";

export const LanguageComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const anchorRef = useRef(null);


  const languages = [
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
  ];

  const headerLanguageChangeHandle = (e, lng) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
    changeLanguage(lng.slug);
    localStorage.setItem("language", lng.slug);
  };

  return (
    <li>
      <LanguageSelector
        languages={languages}
        onChange={headerLanguageChangeHandle}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
    </li>
  );
};
