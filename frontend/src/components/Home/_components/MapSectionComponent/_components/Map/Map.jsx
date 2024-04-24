import React, { useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";
import s from "./Map.module.css";
import { defaultTheme } from "./Theme";
import { CurrentLocationMarker } from "../CurrentLocationMarker/CurrentLocationMarker";
import { Marker } from "../Marker";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  showwhell: false,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  styles: defaultTheme,
};

export const MODES = {
  MOVE: 0,
  SET_MARKER: 1,
};

const Map = ({ center, mode, markers, onMarkerAdd }) => {
  const mapRef = React.useRef(undefined);

  const onLoad = React.useCallback(function callback(map) {
    // When the map is downloaded, we store a link to it so as not to download it again when updating
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    // clear cache
    mapRef.current = undefined;
  }, []);

  const onClick = useCallback(
    (loc) => {
      if (mode === MODES.SET_MARKER) {
        const lat = loc.latLng.lat();
        const lng = loc.latLng.lng();
        console.log({ lat, lng });
        onMarkerAdd({ lat, lng });
      }
    },
    [mode, onMarkerAdd]
  );

  return (
    <div className={s.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
        onClick={onClick}
      >
        <CurrentLocationMarker position={center} />
        {markers.map((pos, i) => {
          return <Marker position={pos} key={i} />;
        })}
      </GoogleMap>
    </div>
  );
};

export { Map };
