import React from "react";
import { LatLngTuple } from "leaflet";
import { MapContainer } from "react-leaflet";
import { makeStyles } from "@material-ui/core";

import { Map } from "./MapComponents";

// map cannot load without default position, central position
// is somewhere around africa
const defaultPosition: LatLngTuple = [-33.86785, 51.20732];

const useStyles = makeStyles({
  fullScreen: {
    height: "100%",
  },
});

/**
 * The Components of the map are rendered in the MapContainer
 * and is considered a wrapper around it. It is separated to move
 * the state down and avoid re-render issues
 * @returns JSX.Element: The Map itself
 */
const MapWrapper = () => {
  const classes = useStyles();
  return (
    <div className={classes.fullScreen}>
      <MapContainer
        className={classes.fullScreen}
        center={defaultPosition}
        zoom={3}
        zoomSnap={0.1}
        zoomControl={false}
        minZoom={3}
        maxBounds={[
          [-130, -200],
          [130, 200],
        ]}
        scrollWheelZoom={true}
      >
        <Map />
      </MapContainer>
    </div>
  );
};

export { MapWrapper };
