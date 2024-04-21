import { useRef, useState } from "react";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";

import imgAM from "../../../images/lng/am.png";
import imgEN from "../../../images/lng/en.png";
import imgRU from "../../../images/lng/ru.png";
import imgFR from "../../../images/lng/fr.png";

export default function LanguageComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const anchorRef = useRef(null);

  const { t } = useTranslation();

  const languages = [
    {
      id: 1,
      slug: "am",
      img: imgAM,
    },
    {
      id: 2,
      slug: "en",
      img: imgEN,
    },
    {
      id: 3,
      slug: "ru",
      img: imgRU,
    },
    {
      id: 4,
      slug: "fr",
      img: imgFR,
    },
  ];

  const headerLanguageClickHandle = (e) => {
    setIsOpen(!isOpen);
  };
  const headerLanguageCloseHandle = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };
  const headerLanguageChangeHandle = (e, lng) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
    changeLanguage(lng.slug);
    localStorage.setItem("language", lng.slug);
    // if not updated changes on other pages use useEffect with callback
    // or change state and track it
    // props.setCallback(!props.callback)
  };
  const headerLanguageKeyDownHandle = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return <></>;
}
