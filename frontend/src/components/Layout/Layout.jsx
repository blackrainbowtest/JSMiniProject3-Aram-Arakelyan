import { Link, Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import s from "./Layout.module.css";
import { useSelector } from "react-redux";

export const Layout = () => {
  const { t } = useTranslation();

  const selections = [
    { link: "/", title: "Main", text: t("Main") },
    { link: "/", title: "Choose", text: t("Choose") },
    { link: "/", title: "Map", text: t("Map") },
    { link: "/", title: "About", text: t("About_us") },
  ];

  const currentSectionRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const isUnlock = useSelector((state) => state?.main?.isUnlock);

  // State to track the active link and scroll state
  const [activeLink, setActiveLink] = useState(selections[0]?.title);
  const [isScrolled, setIsScrolled] = useState(
    window.scrollY === 0 ? false : true
  );

  // Function to smoothly scroll a section by its ID
  const scrollToSection = (sectionId) => {
    currentSectionRef.current = selections.findIndex(
      (item) => item.title === sectionId
    );
    const element = document.getElementById(sectionId);
    if (element) {
      // Adjust the margin Top value as needed
      const marginTop = 0;
      const scrollToY =
        element.getBoundingClientRect().top + window.scrollY - marginTop;
      window.scrollTo({ top: scrollToY, behavior: "smooth" });
    }
  };

  // Function to determine the active section while scrolling
  const determineActiveSection = () => {
    for (let i = selections.length - 1; i >= 0; i--) {
      const section = document.getElementById(selections[i].title);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          // Set the active link based on section
          setActiveLink(selections[i].title);
          break;
        }
      }
    }
  };

  useEffect(() => {
    // Return scroll to 0
    // window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.scrollY >= window.innerHeight) {
      currentSectionRef.current = 1;
    }
    if (window.scrollY >= window.innerHeight * 2) {
      currentSectionRef.current = 2;
    } 
    if (window.scrollY >= window.innerHeight * 3) {
      currentSectionRef.current = 3;
    }
    const handleScroll = () => {
      const paralaxContainerY = document
        .getElementById("Main")
        .getBoundingClientRect().top;
      if (Math.abs(paralaxContainerY) >= window.innerHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      // Calling the function to determine the active section while scrolling
      determineActiveSection();
    };
    const handleWheelScroll = (event) => {
      if (!isUnlock) {
        return; // Check if App is bussy cansle whell scrolling
      }
      const now = Date.now();
      if (event.ctrlKey) {
        return; // Check if Ctrl key is pressed (used for google maps)
      }
      if (now - lastScrollTimeRef.current < 500) {
        return; // Check that the handler is called no more than once every 500 milliseconds
      }
      lastScrollTimeRef.current = now;

      if (event.deltaY > 0) {
        // Scroll down
        if (currentSectionRef.current < selections.length - 1) {
          scrollToSection(selections[currentSectionRef.current + 1].title);
        }
      } else if (event.deltaY < 0) {
        // Scroll up
        if (currentSectionRef.current > 0) {
          scrollToSection(selections[currentSectionRef.current - 1].title);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheelScroll);

    // Remive scroll event listener when the component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheelScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUnlock]);

  return (
    <>
      <header className={`${s.header} ${isScrolled ? s.scrolled : ""}`}>
        <nav className={s.containerFluid}>
          <div className={s.container}>
            <div className={s.row}>
              <div className={s.logo}>Logo</div>
              <ul className={s.menu_bar}>
                {selections.map((item, i) => {
                  return (
                    <li
                      key={i}
                      onClick={(e) => {
                        scrollToSection(item.title);
                      }}
                    >
                      <Link
                        to={item?.link}
                        className={activeLink === item.title ? s.active : ""}
                      >
                        {item?.text}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
};