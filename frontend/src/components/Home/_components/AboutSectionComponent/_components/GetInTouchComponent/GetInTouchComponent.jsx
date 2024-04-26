import s from "./GetInTouchComponent.module.css";
import { CarouselComponent } from "./_components/CarouselComponent/CarouselComponent";
import { TouchFormComponent } from "./_components/TouchFormComponent/TouchFormComponent";

export const GetInTouchComponent = () => {
  return (
    <div className={s.contact}>
      <div className={s.container}>
        <div className={s.row}>
          <div className={s.colMd6}>
            <div className={`${s.titlepage} ${s.textAlignLeft}`}>
              <h2>Get In Touch</h2>
            </div>
            <TouchFormComponent />
          </div>
          <div className={s.colMd6}>
            <div className={`${s.titlepage} ${s.textAlignLeft}`}>
              <h2>What Says Clients</h2>
            </div>
            <CarouselComponent />
          </div>
        </div>
      </div>
    </div>
  );
};
