import React, { useContext, useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";
import { TileLayer, Marker, useMap, Pane, ZoomControl } from "react-leaflet";
import { AppContext } from "../Context/AppContext";
import { Animation } from "./Animate";
import { MaxBounds } from "./MaxBounds";
import { CreateTagForm } from "../CreateTag/CreateTagForm";
import { CreateTagHook } from "../CreateTag/CreateTagHook";

/**
 * Asks user for their location
 * @returns Promise that contains the user's location if request was a success
 */
const getPosition = () => {
  if (!navigator.geolocation) {
    return;
  }
  return new Promise((res: PositionCallback, reject: PositionErrorCallback) =>
    navigator.geolocation.getCurrentPosition(res, reject)
  );
};

const mapStyle = "styles/v1/underflow/cknx9x14z23gj17qhyn0du8br";

/**
 * This is where all of the layers and utilites used by the map
 * are added and rendered, and the state of the map is also
 * managed through this component
 * @returns JSX.Element: All of the layers inside the map
 */
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
        {newMarker && <Marker position={newMarker} />}
      </Pane>
      <Animation />
      <MaxBounds />
      <ZoomControl position="bottomleft" />

      <CreateTagHook
        setMarkersUpdated={setMarkersUpdated}
        setNewMarker={setNewMarker}
      />
      {createForm && (
        <CreateTagForm
          createForm={createForm}
          handleClose={handleClose}
          newMarker={newMarker}
          hhClose={handleClose}
        />
      )}
    </>
  );
};

export { Map };
