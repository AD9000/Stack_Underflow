import React from "react";
import { DashboardNav } from "components/Navbar/DashboardNav";
import { makeStyles } from "@material-ui/styles";
import { useLocation } from "react-router-dom";
import { MyProfile } from "components/Profile/MyProfile";
import { MyTags } from "components/Profile/MyTags";
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
  background: {
    height: "100%",
    backgroundColor: "#051c3f",
  },
  nav: {
    display: "sticky",
  },
  content: {
    padding: "2rem 0",
  },
});

const Profile = () => {
  const classes = useStyles();
  const state = String(useLocation().state);

  return (
    <div className={classes.background}>
      <DashboardNav />
      <Container className={classes.content}>
        {state === "user" && <MyProfile />}
        {state === "tags" && <MyTags />}
      </Container>
    </div>
  );
};

export { Profile };
