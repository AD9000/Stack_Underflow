import React, { useState } from "react";
import { HomeTopNav } from "../components/HomeTopNav";
import { MapWrapper } from "../components/Map";
import { Sidebar } from "../components/Sidebar";
import { AppContext } from "../components/Context";

const Home = () => {
  return (
    <div style={{ height: "100%" }}>
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
        <HomeTopNav signin={true} />
        <Sidebar />
      </div>
    </div>
  );
};

export { Home };
