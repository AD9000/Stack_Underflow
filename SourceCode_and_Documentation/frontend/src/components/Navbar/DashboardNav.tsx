import React, { ReactNode, useState } from "react";
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
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link, useHistory } from "react-router-dom";
import { CreateTag } from "../CreateTag";
import { NavBar } from "./NavBar";

const useStyles = makeStyles((theme: Theme) => ({
  whiteText: {
    color: "white",
  },
  settings: {
    paddingLeft: theme.spacing(1),
    fontSize: "3.5rem",
    color: "#C4C4C4",
  },
  popover: {
    marginTop: theme.spacing(2),
    maxHeight: "55%",
    display: "flex",
    justifyContent: "center",
    "& .MuiPopover-paper": {
      maxWidth: "30rem",
      borderRadius: "10px",
    },
  },
  popoverContent: {
    backgroundColor: "#0f214a",
    color: "white",
  },
  btn: {
    margin: theme.spacing(1),
    color: "white",
    fontFamily: "farro",
    textDecoration: "none",
  },
}));

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

  const handleLogOut = () => {
    history.push("/");
  };

  let username = "username";

  const classes = useStyles();
  return (
    <NavBar title={"DISCOVER. PLAY."}>
      <ButtonGroup className={classes.btn}>
        <Button>
          <Link to="/home">
            <h4 className={classes.whiteText}>About</h4>
          </Link>
        </Button>
        <Button>
          <Link to="/home">
            <h4 className={classes.whiteText}>Help</h4>
          </Link>
        </Button>
      </ButtonGroup>
      <CreateTag />

      <div style={{ flex: 1 }}></div>
      <AccountCircleIcon fontSize="large" />
      <Button className={classes.btn} onClick={handleClickUser}>
        {username}
        <ArrowDropDownIcon />
      </Button>
      <Menu
        id="userMenu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <PersonIcon />
          My Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <PriorityHighIcon />
          Notifications
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
      >
        <MenuItem onClick={handleClose}>
          <SettingsIcon />
          Profile Settings
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
