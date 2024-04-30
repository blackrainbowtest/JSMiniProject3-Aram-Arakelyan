import { AboutSectionComponent } from "./_components/AboutSectionComponent";
import { MapSectionComponent } from "./_components/MapSectionComponent";
import { ParalaxSectionComponent } from "./_components/ParalaxSectionComponent";

const Home = () => {
  return (
    <>
      <ParalaxSectionComponent />
      <MapSectionComponent />
      <AboutSectionComponent />
    </>
  );
};

export { Home };
