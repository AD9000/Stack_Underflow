import React from "react";
import { DashboardNav } from "../components/Navbar/DashboardNav";
import { makeStyles } from "@material-ui/styles";
import { useLocation } from "react-router-dom";
import { MyProfile } from "../components/Profile/MyProfile";
import { MyTags } from "../components/Profile/MyTags";
import { Notifications } from "../components/Profile/Notifications";

const useStyles = makeStyles({
  background: {
    height: "100%",
    backgroundColor: "#051c3f"
  },
  nav: {
    display: 'sticky'
  }
});

const Profile = () => {
  const classes = useStyles();
  const state = useLocation().state;

  return (
    <div className={classes.background}>
      <DashboardNav />
      {state==='user' && <MyProfile/>}
      {state==='notifications' && <Notifications/>}
      {state==='tags' && <MyTags/>}
    </div>
  );
}

export { Profile };