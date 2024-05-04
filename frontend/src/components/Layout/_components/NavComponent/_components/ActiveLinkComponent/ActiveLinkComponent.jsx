import s from "./ActiveLinkComponent.module.css";

export const ActiveLinkComponent = ({ activeLink }) => {
  return (
    <div
      className={s.dt_active_nav}
      style={{ left: `${152 * activeLink}px` }}
    ></div>
  );
};
