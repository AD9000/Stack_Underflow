import React from "react";
import { HomeNav } from "../components/Navbar/HomeNav";
import { DashboardNav } from "../components/Navbar/DashboardNav";
import { makeStyles } from "@material-ui/styles";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
  background: {
    height: "100%",
    backgroundColor: "#051c3f"
  },
});

const AboutPage = () => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.background}>
      { location.state==="home" ? <HomeNav /> : <DashboardNav /> }
    </div>
  );
}

export { AboutPage };