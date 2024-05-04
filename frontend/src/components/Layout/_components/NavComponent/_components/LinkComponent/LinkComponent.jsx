import { Link } from "react-router-dom";
import s from "./LinkComponent.module.css";

export const LinkComponent = ({ to, label, callback, active = false }) => {
  return (
    <Link
      className={`${s.nav_link} ${active ? s.active : ""}`}
      to={to}
      onClick={(e) => callback(e, label)}
    >
      {label}
    </Link>
  );
};
