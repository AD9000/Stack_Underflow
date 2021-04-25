import React, { useState } from "react";
import { DashboardNav } from "../components/Navbar/DashboardNav";
import { Container, makeStyles, Switch } from "@material-ui/core";

const useStyles = makeStyles({
  backgroundDark: {
    backgroundColor: "#051c3f",
    height: "100%",
    color: "white",
  },
  backgroundLight: {
    backgroundColor: "white",
    height: "100%",
    color: "black",
  },
  page: {
    padding: "7rem 0",
  },
  side: {
    display: "flex",
  },
  select: {
    backgroundColor: "white",
  },
});

/**
 * Settings Page: Lets the user manage preferences
 * At the moment, only support changing to light mode
 * @returns {JSX.Element}
 */
const Settings = () => {
  const classes = useStyles();
  const [mode, setMode] = useState(false);
  const [modeTitle, setModeTitle] = useState("Dark");
  const [bg, setBg] = useState(classes.backgroundDark);

  const handleChange = () => {
    setMode(!mode);
    if (mode) {
      setModeTitle("Dark");
      setBg(classes.backgroundDark);
    } else {
      setModeTitle("Light");
      setBg(classes.backgroundLight);
    }
  };
  return (
    <div className={bg}>
      <DashboardNav />
      <Container className={classes.page}>
        <h1>Account Settings</h1>
        <div>
          <h3>Light / Dark Mode</h3>
          <div className={classes.side}>
            <Switch
              checked={mode}
              onChange={handleChange}
              name="mode"
              color="primary"
            />
            <p>{modeTitle}</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export { Settings };
