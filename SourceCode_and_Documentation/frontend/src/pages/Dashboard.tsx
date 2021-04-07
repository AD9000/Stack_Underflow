import React from "react";
import { HomeTopNav } from "../components/HomeTopNav";
import { MapWrapper } from "../components/Map";
import { Sidebar } from "../components/Sidebar";
import { UserNavBar } from "../components/UserNavBar";

const handleclick = () => {
  const audio = new Audio(
    "https://open.spotify.com/track/7D49Iig0avHre9RFSUMkd2"
  );
  audio.play();
};

const Home = () => {
  return (
    <div style={{ height: "100%" }} onClick={handleclick}>
      yeeet
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
        <UserNavBar/>
        {/* <HomeTopNav signin={true} /> */}
        <Sidebar />
      </div>
    </div>
  );
};

export { Home };
