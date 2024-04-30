import { Marker as GoogleMarker } from "@react-google-maps/api";

export const Marker = ({ position, onClick }) => {
  const { lat, lng } = position;
  return (
    <GoogleMarker
      position={{ lat, lng }}
      icon={{ url: "/location.svg", scaledSize: { width: 40, height: 40 } }}
      onClick={(e) => onClick(e, position)}
    ></GoogleMarker>
  );
};
