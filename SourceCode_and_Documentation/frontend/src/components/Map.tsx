import React, { useEffect } from "react";
import { LatLngTuple } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvent,
  Pane,
} from "react-leaflet";
import { CustomPopup } from "./CustomPopup";
import { makeStyles } from "@material-ui/styles";

const defaultPosition: LatLngTuple = [-33.86785, 51.20732];

const useStyles = makeStyles({
  fullScreen: {
    height: "100%",
  },
});

const Animation = () => {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });
  return null;
};

const getPosition = async () => {
  if (!navigator.geolocation) {
    return;
  }
  return new Promise((res: PositionCallback, reject: PositionErrorCallback) =>
    navigator.geolocation.getCurrentPosition(res, reject)
  );
};

const MapWrapper = () => {
  const classes = useStyles();
  return (
    <div className={classes.fullScreen}>
      <MapContainer
        className={classes.fullScreen}
        center={defaultPosition}
        zoom={3}
        scrollWheelZoom={true}
      >
        <Map />
      </MapContainer>
    </div>
  );
};

const Map = () => {
  const map = useMap();

  useEffect(() => {
    (async () => {
      try {
        const pos = await getPosition();
        if (!pos) {
          return;
        }
        map.setView([pos.coords.latitude, pos.coords.longitude]);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [map]);

  return (
    <>
      <Pane
        name="map"
        style={{ position: "absolute", zIndex: -10, pointerEvents: "none" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
          pane="map"
        />
      </Pane>
      <Pane
        name="labels"
        style={{ position: "absolute", zIndex: -9, pointerEvents: "none" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
          pane="labels"
        />
      </Pane>

      <Marker position={defaultPosition}>
        <CustomPopup />
      </Marker>
      <Animation />
    </>
  );
};

export { MapWrapper };
