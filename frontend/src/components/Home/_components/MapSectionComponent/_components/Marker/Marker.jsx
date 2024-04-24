import { Marker as GoogleMarker } from "@react-google-maps/api";

export const Marker = ({ position }) => {
  return (
    <GoogleMarker
      position={position}
      icon={{ url: "/location.svg", scaledSize: { width: 40, height: 40 } }}
    ></GoogleMarker>
  );
};
