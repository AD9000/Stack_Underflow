import { LatLngTuple } from "leaflet";
import React from "react";

interface AppContextType {
  open: boolean;
  setOpen: Function;
  tagIndex: number;
  setTagIndex: Function;
  markers: LatLngTuple[];
  setMarkers: Function;
}

const AppContext = React.createContext<AppContextType>({
  open: false,
  setOpen: () => {},
  tagIndex: -1,
  setTagIndex: () => {},
  markers: [],
  setMarkers: () => {},
});

export { AppContext };
