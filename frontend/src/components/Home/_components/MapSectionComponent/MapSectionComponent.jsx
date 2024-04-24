import { useCallback, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import { Autocomplete } from "./_components/Autocomplete";
import { Map, MODES } from "./_components/Map/";

import s from "../../Home.module.css";
import sLocal from "./MapSectionComponent.module.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const defaultCenter = {
  lat: 40.177,
  lng: 44.503,
};

const libraries = ["places"];

const MapSectionComponent = () => {
  const [center, setCenter] = useState(defaultCenter);
  const [mode, setMode] = useState(MODES.MOVE);
  const [markers, setMarkers] = useState([]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries,
  });

  // the function is not recreated again and does not call the render trigger
  const onPlaceSelect = useCallback((coordinates) => {
    setCenter(coordinates);
  }, []);

  const toggleMode = useCallback(() => {
    switch (mode) {
      case MODES.MOVE:
        setMode(MODES.SET_MARKER);
        break;
      case MODES.SET_MARKER:
        setMode(MODES.MOVE);
        break;
      default:
        setMode(MODES.MOVE);
    }
  }, [mode]);

  const onMarkerAdd = useCallback(
    (coordinates) => {
      setMarkers([...markers, coordinates]);
    },
    [markers]
  );

  const clear = useCallback(
    () => {
      setMarkers([])
    }, []
  );

  return (
    <section id='Map' className={s.MapSection}>
      <div className={sLocal.AutocompleteContainer}>
        {isLoaded ? (
          <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
        ) : (
          ""
        )}
        <button className={sLocal.modeToggle} onClick={toggleMode}>
          Set markers
        </button>
        <button className={sLocal.modeToggle} onClick={clear}>
          Clear
        </button>
      </div>
      {isLoaded ? (
        <Map
          center={center}
          mode={mode}
          markers={markers}
          onMarkerAdd={onMarkerAdd}
        />
      ) : (
        <h2>Loading...</h2>
      )}
    </section>
  );
};

export { MapSectionComponent };
