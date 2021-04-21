import React, { useContext, useEffect, useState } from "react";
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
import { makeStyles, Theme } from "@material-ui/core";
import { AppContext } from "../Context";
import { NewTagForm } from "./NewTagForm";

const mapStyle = "styles/v1/underflow/cknag3sw245zs17o66pbt4dgj";

// map cannot load without default position
const defaultPosition: LatLngTuple = [-33.86785, 51.20732];

const Animation = () => {
  const { createTag } = useContext(AppContext);
  const map = useMapEvent("click", (e) => {
    if (createTag) {
      return;
    }
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });
  return null;
};

interface CreateTagProps {
  setNewMarker: Function;
  setMarkersUpdated: Function;
}
const CreateTag = ({ setMarkersUpdated, setNewMarker }: CreateTagProps) => {
  const { createTag } = useContext(AppContext);
  useEffect(() => {
    console.log("create tag update: ", createTag);
  }, [createTag]);

  useMapEvent("click", (e) => {
    if (!createTag) {
      return;
    }
    const { lat, lng } = e.latlng;
    setNewMarker([lat, lng]);
    setMarkersUpdated(true);
  });

  return null;
};

const MaxBounds = () => {
  const map = useMapEvent("drag", () => {
    const bounds = map.options.maxBounds;
    if (!bounds) {
      return;
    }
    map.panInsideBounds(bounds, { animate: false });
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

const useStyles = makeStyles((theme: Theme) => ({
  fullScreen: {
    height: "100%",
  },
}));

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

const Map = () => {
  const map = useMap();
  const [markersUpdated, setMarkersUpdated] = useState(false);
  const [newMarker, setNewMarker] = useState<LatLngTuple | null>(null);
  const [createForm, setCreateForm] = useState(false);
  const { markers, createTag, setCreateTag, setOpen, setTagIndex } = useContext(
    AppContext
  );

  const handleTagClick = (index: number) => {
    if (createTag) {
      return;
    }
    setTagIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setCreateForm(false);
    setNewMarker(null);
    setCreateTag(false);
    setMarkersUpdated(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const pos = await getPosition();
        if (!pos) {
          return;
        }
        map.setView([pos.coords.latitude, pos.coords.longitude]);

        map.setMaxBounds([
          [pos.coords.latitude - 130, pos.coords.longitude - 200],
          [pos.coords.latitude + 130, pos.coords.longitude + 200],
        ]);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [map]);

  useEffect(() => {
    if (markersUpdated) {
      setCreateForm(true);
    }
  }, [markersUpdated]);

  return (
    <>
      <Pane
        name="map"
        style={{ position: "absolute", zIndex: -10, pointerEvents: "none" }}
      >
        <TileLayer
          // noWrap={true}
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          // url={`https://api.mapbox.com/${mapStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_KEY}`}
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
        {newMarker && <Marker position={newMarker} />}
      </Pane>
      <Animation />
      <MaxBounds />
      <ZoomControl position="bottomleft" />

      <CreateTag
        setMarkersUpdated={setMarkersUpdated}
        setNewMarker={setNewMarker}
      />
      {createForm && (
        <NewTagForm
          createForm={createForm}
          handleClose={handleClose}
          newMarker={newMarker}
        />
      )}
    </>
  );
};

export { MapWrapper };
