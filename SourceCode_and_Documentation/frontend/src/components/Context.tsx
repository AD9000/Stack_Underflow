import { LatLngTuple } from "leaflet";
import React from "react";
import { TagInfo } from "./Interfaces";

interface AppContextType {
  open: boolean;
  setOpen: Function;
  tagIndex: number;
  setTagIndex: Function;
  markers: LatLngTuple[];
  setMarkers: Function;
  createTag: boolean;
  setCreateTag: Function;
  tags: TagInfo[];
  setTags: Function;
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
  tags: [],
  setTags: () => {},
});

export { AppContext };
