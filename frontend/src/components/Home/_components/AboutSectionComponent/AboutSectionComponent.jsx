import s from "../../Home.module.css";
import { CopyrightComponent } from "./_components/CopyrightComponent";
import { GetInTouchComponent } from "./_components/GetInTouchComponent/GetInTouchComponent";
import { SubscribeComponent } from "./_components/SubscribeComponent/SubscribeComponent";

export const AboutSectionComponent = () => {
  return (
    <section id='About' className={s.AboutSection}>
      <GetInTouchComponent />
      <SubscribeComponent />
      <CopyrightComponent />
    </section>
  );
};
