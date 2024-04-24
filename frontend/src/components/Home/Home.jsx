import { AboutSectionComponent } from "./_components/AboutSectionComponent";
import { ChooseSectionComponent } from "./_components/ChooseSectionComponent";
import { MapSectionComponent } from "./_components/MapSectionComponent";
import { ParalaxSectionComponent } from "./_components/ParalaxSectionComponent";

const Home = () => {
  return (
    <>
      <ParalaxSectionComponent />
      <ChooseSectionComponent />
      <MapSectionComponent />
      <AboutSectionComponent />
    </>
  );
};

export { Home };
