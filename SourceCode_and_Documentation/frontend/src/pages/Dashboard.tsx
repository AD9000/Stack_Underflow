import { LatLngTuple } from "leaflet";
import React, { useEffect, useState } from "react";
import { AppContext } from "../components/Context";
import { MapWrapper } from "../components/Map";
import { DashboardNav } from "../components/Navbar/DashboardNav";
import { Sidebar } from "../components/Sidebar";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [tagIndex, setTagIndex] = useState(-1);
  const [markers, setMarkers] = useState<LatLngTuple[]>([]);
  useEffect(() => {
    setMarkers([
      [-33.86785, 151.20732],
      [-43.52565, 172.639847],
      [-42.87936, 147.32941],
    ]);
  }, []);
  return (
    <AppContext.Provider
      value={{ open, setOpen, tagIndex, setTagIndex, markers, setMarkers }}
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
        <div style={{ position: "absolute", top: 50, left: 50, zIndex: 10 }}>
          <Sidebar />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export { Dashboard };
