import { useEffect, useRef, useState } from "react";
import s from "./ClickOut.module.css";

export const ClickOut = ({ children, callback }) => {
  const ref = useRef(null);
  const [shouldHandleClick, setShouldHandleClick] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shouldHandleClick &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        callback();
      } else if (!shouldHandleClick) {
        setShouldHandleClick((prev) => !prev);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [callback, shouldHandleClick]);

  return (
    <div ref={ref} className={s.clickout}>
      {children}
    </div>
  );
};