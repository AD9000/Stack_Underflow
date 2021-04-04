import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { makeStyles } from "@material-ui/styles";
import { LatLngTuple } from "leaflet";

const useStyles = makeStyles({
  fullScreen: {
    height: "100%",
  },
});

const position: LatLngTuple = [-33.86785, 151.20732];

const Map = () => {
  const classes = useStyles();
  return (
    <MapContainer
      className={classes.fullScreen}
      center={position}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export { Map };
