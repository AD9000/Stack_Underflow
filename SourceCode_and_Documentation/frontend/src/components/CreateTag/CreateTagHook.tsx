import { useContext } from "react";
import { useMapEvent } from "react-leaflet";
import { AppContext } from "context/AppContext";

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
