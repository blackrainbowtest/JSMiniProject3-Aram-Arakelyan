import { useEffect } from 'react';
import { AboutSectionComponent } from './_components/AboutSectionComponent';
import { ChooseSectionComponent } from './_components/ChooseSectionComponent';
import { MapSectionComponent } from './_components/MapSectionComponent';

export default function Home() {

    useEffect(() => {

    }, []);
      
    return (
        <>
            <ChooseSectionComponent />
            <MapSectionComponent />
            <AboutSectionComponent />
        </>
    )
}