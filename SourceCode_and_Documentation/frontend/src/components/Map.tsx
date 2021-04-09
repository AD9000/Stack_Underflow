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
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "./Context";

const mapStyle = "styles/v1/underflow/cknag3sw245zs17o66pbt4dgj";

// map cannot load without default position
const defaultPosition: LatLngTuple = [-33.86785, 51.20732];

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

const useStyles = makeStyles({
  fullScreen: {
    height: "100%",
  },
});

const MapWrapper = () => {
  const classes = useStyles();
  return (
    <div className={classes.fullScreen}>
      <MapContainer
        className={classes.fullScreen}
        center={defaultPosition}
        zoom={2.5}
        zoomSnap={0.1}
        zoomControl={false}
        minZoom={2.5}
        scrollWheelZoom={true}
      >
        <Map />
      </MapContainer>
    </div>
  );
};

const Map = () => {
  const map = useMap();
  const { markers, setOpen, setTagIndex } = useContext(AppContext);

  const handleTagClick = (index: number) => {
    setTagIndex(index);
    setOpen(true);
  };

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
          // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          url={`https://api.mapbox.com/${mapStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_KEY}`}
          pane="map"
        />
      </Pane>

      <Pane name="markers">
        {markers.map((position, index) => (
          <Marker
            eventHandlers={{ click: () => handleTagClick(index) }}
            key={index}
            position={position}
          ></Marker>
        ))}
      </Pane>
      <Animation />
      <ZoomControl position="bottomleft" />
      {/* <ZoomCheck /> */}
    </>
  );
};

export { MapWrapper };
