import { Link } from "react-router-dom";
import s from './LogoComponent.module.css'
import logoIMG from '../../../../images/Layout/logo.png'

export const LogoComponent = () => {
  return (
    <Link className={s.logo} to={"/"}>
      <img src={logoIMG} alt="" />
    </Link>
  );
};
