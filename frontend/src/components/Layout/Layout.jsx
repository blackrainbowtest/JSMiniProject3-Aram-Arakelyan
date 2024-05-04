import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Loader } from "../_common/Loader";
import { MainContainer } from "../_common/MailContainer/MainContainer";
import { LogoComponent } from "./_components/LogoComponent/LogoComponent";
import { NavComponent } from "./_components/NavComponent/NavComponent";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const Layout = () => {
  const { t } = useTranslation();

  // Is everything load?
  const loading = useSelector((state) => state?.image?.loading);
  const loadingCoord = useSelector((state) => state?.coordinates?.loading);
  const loadingMain = useSelector((state) => state?.main?.loading);
  //   Keep active link index (default first link)
  const [activeLink, setActiveLink] = useState(0);
  //   Render array only when language is changed
  const selections = useMemo(
    () => [
      { to: "/", title: "Main", label: t("Main") },
      { to: "/", title: "Map", label: t("Map") },
      { to: "/", title: "About", label: t("About_us") },
    ],
    [t]
  );
  // Keep refs
  const currentSectionRef = useRef(0);
  const lastScrollTimeRef = useRef(0);

  const scrollTimerChangeHandler = useCallback((timer = 500) => {
    const now = Date.now();
    if (now - lastScrollTimeRef.current < timer) {
      return; // Check that the handler is called no more than once every 500 milliseconds default
    }
    return (lastScrollTimeRef.current = now);
  }, []);

  const currentSectionChangeHandler = useCallback((index) => {
    currentSectionRef.current = index;
  }, []);

  const getActiveContainerDOM = useCallback(
    (index) => {
      return document.getElementById(selections[index]?.title) || null;
    },
    [selections]
  );

  // Function to smoothly scroll a section by its ID
  const scrollToSection = useCallback(
    (index) => {
      setActiveLink(index);
      currentSectionChangeHandler(index);
      const element = getActiveContainerDOM(index);
      if (element) {
        const elementTop = element.getBoundingClientRect().top;
        const scrollToY = elementTop + window.scrollY;
        // Adjust the margin Top value as needed
        window.scrollTo({ top: scrollToY, behavior: "smooth" });
      }
    },
    [currentSectionChangeHandler, getActiveContainerDOM]
  );

  const navClickHandler = useCallback(
    (index) => {
      if (scrollTimerChangeHandler()) {
        scrollToSection(index);
      }
    },
    [scrollTimerChangeHandler, scrollToSection]
  );

  useEffect(() => {
    scrollToSection(0);
    const handleWheelScroll = (event) => {
      if (
        loading ||
        loadingCoord ||
        loadingMain ||
        event.ctrlKey ||
        !scrollTimerChangeHandler()
      ) {
        return; // Check if App is bussy cansle whell scrolling
      }

      if (event.deltaY > 0) {
        // Scroll down
        if (currentSectionRef.current < selections.length - 1) {
          scrollToSection(currentSectionRef.current + 1);
        }
      } else if (event.deltaY < 0) {
        // Scroll up
        if (currentSectionRef.current > 0) {
          scrollToSection(currentSectionRef.current - 1);
        }
      }
    };

    window.addEventListener("wheel", handleWheelScroll);
    // Remove scroll event listener when the component unmount
    return () => {
      window.removeEventListener("wheel", handleWheelScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading || loadingCoord || loadingMain ? (
        <Loader />
      ) : (
        <MainContainer>
          <LogoComponent />
          <NavComponent
            selections={selections}
            activeLink={activeLink}
            callback={navClickHandler}
          />
        </MainContainer>
      )}
      <Outlet />
    </>
  );
};
