import { useEffect } from "react";
import { AboutSectionComponent } from "./_components/AboutSectionComponent";
import { ChooseSectionComponent } from "./_components/ChooseSectionComponent";
import { MapSectionComponent } from "./_components/MapSectionComponent";
import { ParalaxSectionComponent } from "./_components/ParalaxSectionComponent";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <>
      <ParalaxSectionComponent />
      <ChooseSectionComponent />
      <MapSectionComponent />
      <AboutSectionComponent />
    </>
  );
}
