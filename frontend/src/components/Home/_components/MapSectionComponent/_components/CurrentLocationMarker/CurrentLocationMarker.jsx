import { Marker } from "@react-google-maps/api";

export const CurrentLocationMarker = ({ position }) => {
  return (
    <Marker
      position={position}
      icon={{ url: "/marker.svg", scaledSize: { width: 40, height: 40 } }}
    />
  );
};
