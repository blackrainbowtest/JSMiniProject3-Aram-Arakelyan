import { useCallback } from "react";

import s from "./NavComponent.module.css";
import { LinkComponent } from "./_components/LinkComponent/LinkComponent";
import { ActiveLinkComponent } from "./_components/ActiveLinkComponent/ActiveLinkComponent";
import { LanguageComponent } from "./_components/LanguageComponent/LanguageComponent";

export const NavComponent = ({
  selections,
  activeLink,
  callback,
}) => {
  const linkClickHandle = useCallback(
    (e, label) => {
      e.stopPropagation();
      const index = selections.findIndex((select) => select.label === label);
      callback(index);
    },
    [selections, callback]
  );

  return (
    <div className={s.nav}>
      <ActiveLinkComponent activeLink={activeLink} />
      {selections.map((item, i) => {
        return (
          <LinkComponent
            key={i}
            to={item.to}
            label={item.label}
            callback={linkClickHandle}
            active={activeLink === i}
          />
        );
      })}
      <LanguageComponent />
    </div>
  );
};
