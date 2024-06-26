import { useCallback, useEffect, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { Autocomplete } from "./_components/Autocomplete";
import { Map, MODES } from "./_components/Map/";
import { Popap } from "../../../_common/Popap";
import { Loader } from "../../../_common/Loader";

import s from "../../Home.module.css";
import sLocal from "./MapSectionComponent.module.css";
import { getBrowserLocation } from "../../../../utils/geo";
import { ImageUploadPopup } from "./_components/ImageUploadPopup";
import { ImageDisplayPopup } from "./_components/ImageDisplayPopup/ImageDisplayPopup";
import { postImages } from "../../../../features/Image/ImageAPI";
import { getCoordinates } from "../../../../features/Coordinates/CoordinatesAPI";
import { setError } from "../../../../features/Image/ImageSlice";

const API_KEY = process.env.REACT_APP_API_KEY;

const defaultCenter = {
  lat: 40.177,
  lng: 44.503,
};

const libraries = ["places"];

const MapSectionComponent = () => {
  const { t } = useTranslation();

  const [center, setCenter] = useState(defaultCenter);
  const [mode, setMode] = useState(MODES.MOVE);
  const [isPopap, setIsPopap] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [markers, setMarkers] = useState([
    {
      lat: 40.577,
      lng: 44.503,
    },
  ]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const dispatch = useDispatch();
  
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
      setIsPopap(coordinates);
    },
    []
  );

  const clear = useCallback(() => {
    setMarkers([]);
  }, []);

  useEffect(() => {
    dispatch(getCoordinates())
      .then((markerData) => {
        setMarkers(markerData.payload);
      })
      .catch((error) => {
        dispatch(setError({ message: error }));
      });
    getBrowserLocation()
      .then((defaultLocation) => {
        setCenter(defaultLocation);
      })
      .catch((defaultLocation) => {
        setCenter(defaultLocation);
      });
  }, [dispatch]);

  const closePopap = useCallback(
    (e) => {
      setIsPopap(false);
      setIsSelected(false);
    },
    []
  );

  // Send data to server
  const handleSubmit = useCallback(
    (text, images) => {
      dispatch(postImages({ ...isPopap, text, images }))
        .then((res) => {
          setMode(MODES.MOVE);
          setIsPopap(false);
          setMarkers((prev) => [...prev, res.payload]);
        })
        .catch((error) => {
          dispatch(setError({ message: error }));
        });
    },
    [dispatch, isPopap]
  );

  const onMarkerClick = useCallback(
    (e, position) => {
      if (mode === MODES.MOVE) {
        setIsSelected(position);
      }
    },
    [mode]
  );

  return (
    <>
      <section id='Map' className={s.MapSection}>
        <div className={sLocal.AutocompleteContainer}>
          {isLoaded ? (
            <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
          ) : (
            ""
          )}
          <button
            className={`${sLocal.modeToggle} ${
              mode === MODES.MOVE ? "" : sLocal.selected
            }`}
            onClick={toggleMode}
          >
            {mode === MODES.MOVE ? t("SetMarker") : t("CancelSetting")}
          </button>
          <button className={sLocal.modeToggle} onClick={clear}>
            {t("clear")}
          </button>
        </div>
        {isLoaded ? (
          <Map
            center={center}
            mode={mode}
            markers={markers}
            onMarkerAdd={onMarkerAdd}
            onMarkerClick={onMarkerClick}
          />
        ) : (
          <Loader />
        )}
        {isPopap ? (
          <Popap handleChange={closePopap}>
            <ImageUploadPopup
              handleChange={closePopap}
              handleSubmit={handleSubmit}
            />
          </Popap>
        ) : (
          ""
        )}
        {isSelected ? (
          <Popap handleChange={closePopap}>
            <ImageDisplayPopup props={isSelected} />
          </Popap>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export { MapSectionComponent };
