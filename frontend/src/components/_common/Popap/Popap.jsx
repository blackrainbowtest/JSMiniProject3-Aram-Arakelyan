import { useCallback } from "react";

export const Popap = ({ children, handleChange }) => {
  const handlePopapClick = useCallback(() => {
    handleChange((prev) => !prev);
  }, [handleChange]);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.5)"
      }}
      onClick={handlePopapClick}
    >
      {children}
    </div>
  );
};
