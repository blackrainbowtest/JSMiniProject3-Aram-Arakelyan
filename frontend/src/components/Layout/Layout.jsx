import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { Loader } from "../_common/Loader";
import { MainContainer } from "../_common/MailContainer/MainContainer";
import { LogoComponent } from "./_components/LogoComponent/LogoComponent";
import { NavComponent } from "./_components/NavComponent/NavComponent";

export const Layout = () => {
  const loading = useSelector((state) => state?.image?.loading);
  const loadingCoord = useSelector((state) => state?.coordinates?.loading);
  const loadingMain = useSelector((state) => state?.main?.loading);

  return (
    <>
      {loading || loadingCoord || loadingMain ? (
        <Loader />
      ) : (
        <MainContainer>
          <LogoComponent />
          <NavComponent />
        </MainContainer>
      )}
      <Outlet />
    </>
  );
};
