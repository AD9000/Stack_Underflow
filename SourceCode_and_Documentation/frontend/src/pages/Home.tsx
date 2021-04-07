import React from "react";
import { MapWrapper } from "../components/Map";
import { Tag } from "../components/Tag";

const Home = () => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ height: "100%", flex: 1 }}>
        <MapWrapper />
      </div>
    </div>
  );
};

export { Home };
