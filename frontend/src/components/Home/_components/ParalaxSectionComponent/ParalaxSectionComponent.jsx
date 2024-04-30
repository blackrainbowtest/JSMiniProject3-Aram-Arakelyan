import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Loader } from "../../../_common/Loader";
import { setLoad } from "../../../../features/Main/MainSlice";
import paralaxImg50 from "../../../../images/paralax/50.png";
import paralaxImg49 from "../../../../images/paralax/49.png";
import paralaxImg48 from "../../../../images/paralax/48.png";
import paralaxImg47 from "../../../../images/paralax/47.png";
import paralaxImg46 from "../../../../images/paralax/46.png";
import paralaxImg45 from "../../../../images/paralax/45.png";

import s from "../../Home.module.css";
import localStyles from "./style.module.css";

const positionObj = {
  paralaxImg45: { x: 0, y: 0, speed: 8 },
  paralaxImg46: { x: 0, y: 0, speed: 6 },
  paralaxImg47: { x: 0, y: 0, speed: 3 },
  paralaxImg48: { x: 0, y: 0, speed: -3 },
  paralaxImg49: { x: 0, y: 0, speed: -6 },
  paralaxImg50: { x: 0, y: 0, speed: -8 },
};

const images = [
  paralaxImg50,
  paralaxImg49,
  paralaxImg48,
  paralaxImg47,
  paralaxImg46,
  paralaxImg45,
];

const ParalaxSectionComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.main?.loading);

  const [positions, setPositions] = useState(positionObj);

  useEffect(() => {
    // We wait for all images to load and then display the content
    Promise.all(
      images.map((img) => {
        return new Promise((resolve, reject) => {
          const imageLoader = new Image();
          imageLoader.src = img;
          imageLoader.onload = resolve;
          imageLoader.onerror = reject;
        });
      })
    )
      .then(() => {
        dispatch(setLoad(false));
      })
      .catch((error) => {
        console.error("Error loading images:", error);
      });

    // Mouse move event catcher
    const handleMouseMove = (e) => {
      const paralaxContainerY = document
        .getElementById("Main")
        .getBoundingClientRect().top;
      if (!(Math.abs(paralaxContainerY) >= window.innerHeight)) {
        const newPositions = {};
        Object.keys(positions).forEach((key) => {
          const x = (e.pageX * positions[key].speed) / 500;
          const y = (e.pageY * positions[key].speed) / 500;

          newPositions[key] = { ...positions[key], x, y };
        });

        setPositions(newPositions);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Remive scroll event listener when the component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id='Main' className={s.MainSection}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <img
            src={paralaxImg45}
            className={localStyles.layer}
            alt='img45'
            style={{
              transform: `translate(${positions.paralaxImg45.x}px, ${positions.paralaxImg45.y}px)`,
              zIndex: 45,
            }}
          />
          <img
            src={paralaxImg46}
            className={localStyles.layer}
            alt='img46'
            style={{
              transform: `translate(${positions.paralaxImg46.x}px, ${positions.paralaxImg46.y}px)`,
              zIndex: 46,
            }}
          />
          <img
            src={paralaxImg47}
            className={localStyles.layer}
            alt='img47'
            style={{
              transform: `translate(${positions.paralaxImg47.x}px, ${positions.paralaxImg47.y}px)`,
              zIndex: 47,
            }}
          />
          <img
            src={paralaxImg48}
            className={localStyles.layer}
            alt='img48'
            style={{
              transform: `translate(${positions.paralaxImg48.x}px, ${positions.paralaxImg48.y}px)`,
              zIndex: 48,
            }}
          />
          <img
            src={paralaxImg49}
            className={localStyles.layer}
            alt='img49'
            style={{
              transform: `translate(${positions.paralaxImg49.x}px, ${positions.paralaxImg49.y}px)`,
              zIndex: 49,
            }}
          />
          <img
            src={paralaxImg50}
            className={localStyles.layer}
            alt='img50'
            style={{
              transform: `translate(${positions.paralaxImg50.x}px, ${positions.paralaxImg50.y}px)`,
              zIndex: 50,
            }}
          />
          <h2>{t("productName")}</h2>
        </>
      )}
    </section>
  );
};

export { ParalaxSectionComponent };
