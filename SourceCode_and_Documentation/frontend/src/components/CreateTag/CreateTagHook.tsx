import React, { useContext, useEffect } from "react";
import { useMapEvent } from "react-leaflet";
import { AppContext } from "../Context";

export interface CreateTagProps {
  setNewMarker: Function;
  setMarkersUpdated: Function;
}

/**
 * Hook that enables the user to place a tag on the map when creating a tag
 * @param CreateTagProps: -> Functions to update the state once a marker has been placed by the user
 * @returns null
 */
const CreateTagHook = ({ setMarkersUpdated, setNewMarker }: CreateTagProps) => {
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

export { CreateTagHook };
