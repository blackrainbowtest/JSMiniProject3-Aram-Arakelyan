import s from "./CopyrightComponent.module.css";

export const CopyrightComponent = () => {
  return (
    <div className={s.copyright}>
      <div className={s.container}>
        <div className={s.row}>
            <p className={s.reserved}>© 2024 All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};
