import { LatLngTuple } from "leaflet";
import React, { useEffect, useState } from "react";
import { AppContext } from "../components/Context/AppContext";
import { MapWrapper } from "../components/Map";
import { DashboardNav } from "../components/Navbar/DashboardNav";
import { Sidebar } from "../components/Sidebar/Sidebar";
import {
  BackendTag,
  BackendTagToTagInfo,
  TagInfo,
} from "../components/Interfaces";
import { useHistory } from "react-router-dom";
import { apiViewTags } from "../helpers/api";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [tagIndex, setTagIndex] = useState(-1);
  const [markers, setMarkers] = useState<LatLngTuple[]>([]);
  const [createTag, setCreateTag] = useState(false);
  const [tags, setTags] = useState<TagInfo[]>([]);

  const history = useHistory();

  useEffect(() => {
    const checkLoggedIn = () => {
      const isLoggedIn = localStorage.getItem("username");
      if (!isLoggedIn) {
        history.push("/");
      }
    };

    checkLoggedIn();

    apiViewTags()
      .then((res) => res.json())
      .then((data) => {
        const updated: TagInfo[] = data["tag list"]
          .map((tagInfo: BackendTag) => {
            return BackendTagToTagInfo(tagInfo);
          })
          .filter((ele: TagInfo | null) => ele);

        const mark = updated.map((tag) => tag.coords);
        setMarkers(mark);
        setTags([...updated]);
      });
  }, []);
  return (
    <AppContext.Provider
      value={{
        open,
        setOpen,
        tagIndex,
        setTagIndex,
        markers,
        setMarkers,
        createTag,
        setCreateTag,
        tags,
        setTags,
      }}
    >
      <DashboardNav />
      <div style={{ height: "100%" }}>
        <div
          style={{
            height: "100vh",
            position: "absolute",
            zIndex: 1,
            left: 0,
            width: "100%",
            marginTop: "1%",
          }}
        >
          <MapWrapper />
        </div>
        <div
          style={{
            marginTop: "8%",
            position: "absolute",
            top: 50,
            left: 50,
            zIndex: 10,
          }}
        >
          <Sidebar />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export { Dashboard };
