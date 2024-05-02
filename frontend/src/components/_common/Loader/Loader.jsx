import s from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={s.loader_bg}>
      <div className={s.loader}>
        <img src='/images/loading.webp' alt='loading...' />
      </div>
    </div>
  );
};
