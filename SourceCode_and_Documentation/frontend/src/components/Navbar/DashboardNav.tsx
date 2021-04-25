import React, { useState } from "react";
import {
  Button,
  Theme,
  makeStyles,
  Menu,
  MenuItem,
  ButtonGroup,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useHistory } from "react-router-dom";
import { CreateTagButton } from "../CreateTag/CreateTagButton";
import { NavBar } from "./NavBar";
import { getToken } from "helpers/token";
import { apiLogout } from "helpers/api";

const useStyles = makeStyles((theme: Theme) => ({
  whiteText: {
    color: "white",
    fontFamily: "farro",
    "&:hover": {
      background: "rgba(255,255,255,0.2)",
    },
  },
  settings: {
    paddingLeft: theme.spacing(1),
    fontSize: "3.5rem",
    color: "#C4C4C4",
    "&:hover": {
      background: "rgba(255,255,255,0.2)",
    },
  },
  btn: {
    margin: theme.spacing(1),
    color: "white",
    fontFamily: "farro",
    textDecoration: "none",
  },
  hover: {
    "&:hover": {
      background: "rgba(255,255,255,0.2)",
    },
    display: "flex",
    padding: "10px",
    borderRadius: "3px",
  },
  menu: {
    margin: "2rem 0 0 0",
  },
}));

/**
 * The navbar as it is rendered on the dashboard. Its an extension of
 * the Navbar component
 * @returns {JSX.Element} DashBoardNav
 */
const DashboardNav = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [
    settingsAnchor,
    setSettingsAnchor,
  ] = React.useState<null | HTMLElement>(null);

  let history = useHistory();

  const handleClickUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSettingsAnchor(null);
  };

  const handleLogOut = async () => {
    // no point in checking if logout fails,
    // logout anyway
    apiLogout();

    // remove username
    localStorage.removeItem("username");
    history.push("/");
  };

  const toPage = (path: string, state: string) => {
    history.push({
      // Navigates to About page
      pathname: `/${path}`,
      state: state,
    });
    return;
  };

  const username = getToken("username") || "user";

  const classes = useStyles();
  return (
    <NavBar title={"DISCOVER. PLAY."}>
      <ButtonGroup className={classes.btn}>
        <Button
          onClick={() => toPage("about", "dashboard")}
          className={classes.whiteText}
        >
          <h4>About</h4>
        </Button>
        <Button
          onClick={() => toPage("help", "dashboard")}
          className={classes.whiteText}
        >
          <h4>Help</h4>
        </Button>
      </ButtonGroup>
      <CreateTagButton />

      <div style={{ flex: 1 }}></div>
      <Button className={classes.btn} onClick={handleClickUser}>
        <AccountCircleIcon fontSize="large" style={{ margin: 0 }} />
        <div className={classes.hover}>
          {username}
          <ArrowDropDownIcon />
        </div>
      </Button>
      <Menu
        id="userMenu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        <MenuItem onClick={() => toPage("profile", "user")}>
          <PersonIcon />
          My Profile
        </MenuItem>
        <MenuItem onClick={() => toPage("profile", "tags")}>
          <LocationOnIcon />
          My Tags
        </MenuItem>
      </Menu>
      <Button onClick={handleClickSettings} className={classes.settings}>
        <SettingsIcon />
      </Button>

      <Menu
        id="settingsMenu"
        anchorEl={settingsAnchor}
        keepMounted
        open={Boolean(settingsAnchor)}
        onClose={handleClose}
        className={classes.menu}
      >
        <MenuItem onClick={() => toPage("settings", "")}>
          <SettingsIcon />
          Account Settings
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ExitToAppIcon />
          Log Out
        </MenuItem>
      </Menu>
    </NavBar>
  );
};

export { DashboardNav };
