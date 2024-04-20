import { Link, Outlet } from "react-router-dom";
import { selections } from "./selections";
import styles from "./style.module.css";

export default function Layout() {
  return (
    <>
      <nav>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.logo}>Logo</div>
            <ul className={styles.menu_bar}>
              {selections.map((item, i) => {
                return (
                  <li key={i}>
                    <Link to={item.link}>{item.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
