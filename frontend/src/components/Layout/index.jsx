import { Link, Outlet } from "react-router-dom";
import { selections } from "./selections";
import styles from "./style.module.css";
import { useEffect, useRef, useState } from "react";

export default function Layout() {
  // State to track the active link and scroll state
  const [activeLink, setActiveLink] = useState(selections[0]?.title);
  const [isScrolled, setIsScrolled] = useState(false);
  const currentSectionRef = useRef(0);
  const lastScrollTimeRef = useRef(0);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      // Calling the function to determine the active section while scrolling
      determineActiveSection();
    };

    const handleWheelScroll = (event) => {
      const now = Date.now();
      if (now - lastScrollTimeRef.current < 500) {
        // Check that the handler is called no more than once every 500 milliseconds
        return;
      }
      lastScrollTimeRef.current = now;

      if (event.deltaY > 0) {
        console.log(currentSectionRef.current, selections.length - 1);
        // Scroll down
        if (currentSectionRef.current < selections.length - 1) {
          scrollToSection(selections[currentSectionRef.current + 1].title);
        }
      } else if (event.deltaY < 0) {
        // Scroll up
        if (currentSectionRef.current > 0) {
          scrollToSection(selections[currentSectionRef.current - 1].title);
        }
        console.log("Прокрутка вверх");
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheelScroll);

    // Remive scroll event listener when the component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheelScroll);
    };
  }, []);

  return (
    <>
      <nav className={isScrolled ? styles.scrolled : ""}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.logo}>Logo</div>
            <ul className={styles.menu_bar}>
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
                      className={activeLink === item.title ? styles.active : ""}
                    >
                      {item?.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
