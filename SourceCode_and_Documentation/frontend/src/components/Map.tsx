import React, { useContext, useEffect } from "react";
import { LatLngTuple } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvent,
  Pane,
  ZoomControl,
} from "react-leaflet";
import { CustomPopup } from "./CustomPopup";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "./Context";
import { SettingsPowerRounded } from "@material-ui/icons";

const defaultPosition: LatLngTuple = [-33.86785, 151.20732];
const p2: LatLngTuple = [-43.52565, 172.639847];
const p3: LatLngTuple = [-42.87936, 147.32941];

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
        zoom={4}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <Map />
      </MapContainer>
    </div>
  );
};

const Map = () => {
  const map = useMap();
  const { markers, setOpen } = useContext(AppContext);

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
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          pane="map"
        />
      </Pane>

      <Pane name="markers">
        {markers.map((position, index) => (
          <Marker
            eventHandlers={{ click: () => setOpen(index + 1) }}
            key={index}
            position={position}
          ></Marker>
        ))}
      </Pane>
      {/* <Marker position={defaultPosition}>
        <CustomPopup />
      </Marker>
      <Marker position={p2}>
        <CustomPopup />
      </Marker>
      <Marker position={p3}>
        <CustomPopup />
        </Marker> */}
      <Animation />
      <ZoomControl position="bottomleft" />
    </>
  );
};

export { MapWrapper };
