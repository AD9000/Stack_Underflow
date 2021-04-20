import { LatLngTuple } from "leaflet";
import React from "react";

interface AppContextType {
  open: boolean;
  setOpen: Function;
  tagIndex: number;
  setTagIndex: Function;
  markers: LatLngTuple[];
  setMarkers: Function;
  createTag: boolean;
  setCreateTag: Function;
}

const AppContext = React.createContext<AppContextType>({
  open: false,
  setOpen: () => {},
  tagIndex: -1,
  setTagIndex: () => {},
  markers: [],
  setMarkers: () => {},
  createTag: false,
  setCreateTag: () => {},
});

export { AppContext };
