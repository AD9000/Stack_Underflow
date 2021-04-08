import { LatLngTuple } from "leaflet";
import React from "react";

interface AppContextType {
  open: number;
  setOpen: Function;
  markers: LatLngTuple[];
  setMarkers: Function;
}

const AppContext = React.createContext<AppContextType>({
  open: 0,
  setOpen: () => {},
  markers: [],
  setMarkers: () => {},
});

export { AppContext };
