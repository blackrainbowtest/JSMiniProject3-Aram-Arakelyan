import s from "./CarouselButton.module.css";

export const SYMBOL = {
  prev: "\u2039",
  next: "\u203a",
};

export const CarouselButton = ({ symbol, callback }) => {
  return (
    <div
      className={
        symbol === SYMBOL.prev ? s.carouselControlPrev : s.carouselControlNext
      }
      onClick={(e) => callback(e, symbol)}
    >
      {symbol}
    </div>
  );
};
