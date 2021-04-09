import { LatLngTuple } from "leaflet";
import React, { useEffect, useState } from "react";
import { AppContext } from "../components/Context";
import { MapWrapper } from "../components/Map";
import { Sidebar } from "../components/Sidebar";
import { UserNavBar } from "../components/UserNavBar";

const handleclick = () => {
  const audio = new Audio(
    "https://open.spotify.com/track/7D49Iig0avHre9RFSUMkd2"
  );
  audio.play();
};

const Dashboard = () => {
  const [open, setOpen] = useState(0);
  const [markers, setMarkers] = useState<LatLngTuple[]>([]);
  useEffect(() => {
    setMarkers([
      [-33.86785, 151.20732],
      [-43.52565, 172.639847],
      [-42.87936, 147.32941],
    ]);
  }, []);
  return (
    <AppContext.Provider value={{ open, setOpen, markers, setMarkers }}>
      <div style={{ height: "100%" }} onClick={handleclick}>
        <div
          style={{
            height: "100vh",
            position: "absolute",
            zIndex: 1,
            left: 0,
            width: "100%",
          }}
        >
          <MapWrapper />
        </div>
        <div style={{ position: "absolute", top: 50, left: 50, zIndex: 10 }}>
          <UserNavBar />
          <Sidebar />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export { Dashboard };
