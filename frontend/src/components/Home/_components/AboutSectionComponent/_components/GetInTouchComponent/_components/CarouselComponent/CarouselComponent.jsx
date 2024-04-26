import { useCallback } from "react";
import { SYMBOL } from "./_components/CarouselButton";
import { CarouselButton } from "./_components/CarouselButton";
import s from "./CarouselComponent.module.css";
import { CarouselItem } from './_components/CarouselItem';

export const CarouselComponent = () => {
  const buttonClickHandle = useCallback((e, symbol) => {
    console.log(symbol);
  }, []);
  return (
    <div className={s.carousel}>
        <CarouselItem />
      <div className={s.btn}>
        <CarouselButton symbol={SYMBOL.prev} callback={buttonClickHandle} />
        <CarouselButton symbol={SYMBOL.next} callback={buttonClickHandle} />
      </div>
    </div>
  );
};
