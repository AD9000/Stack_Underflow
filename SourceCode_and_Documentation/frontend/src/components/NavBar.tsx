import React, { ReactNode, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Theme,
  makeStyles,
  Popover,
  Typography,
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
import LoginButton from "./LoginButton";
import reefPic from "../assets/reef.jpeg";
import playButton from "../assets/playButton.png";
import { Link, useHistory } from "react-router-dom";
import { TagInfo, tpp } from "./Interfaces";
import { TagView } from "./TagView";
import { CreateTag } from "./CreateTag";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: "#000006",
    fontFamily: "farro",
    justifyContent: "space-between",
    padding: theme.spacing(0.5),
    maxHeight: "8vh",
  },
  toolBar: {
    display: "flex",
    flex: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  grow: {
    display: "flex",
    flex: 1,
  },
  whiteText: {
    color: "white",
  },
  buttonText: {
    textTransform: "none",
    margin: "0.5rem",
  },
  title: {
    marginRight: theme.spacing(2),
  },
  playButton: {
    marginRight: theme.spacing(2),
    maxWidth: "70%",
  },
  playWrapper: {
    display: "flex",
    justifyContent: "center",
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

interface NavBarProps {
  title: string;
  children?: ReactNode;
}

const NavBar = ({ children, title }: NavBarProps) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <div className={classes.playWrapper}>
          <Link to="/home">
            <img
              alt={"app logo (play button)"}
              src={playButton}
              className={classes.playButton}
            />
          </Link>
        </div>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};

const HomeNav = () => {
  const [randomTag, setRandomTag] = useState<TagInfo | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const generateRandomTag = (
    click: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    click.preventDefault();

    // opening a random tag
    // TODO: Make API call here
    const newTag: TagInfo = {
      region: "Australia",
      username: "Anonymous",
      title: "Beautiful Experience!",
      imgurl: reefPic,
      location: "Queensland",
      songName: "Water",
      songArtist: "Kanye West",
      desc: `Being underwater is such a surreal experience, one that I
      can't compare to anything else! My favourite lyric in this
      song is "Clean us like the rain in spring... Let Your light
      reflect on me" Can't wait until I see the ocean again!!!`,
    };

    setAnchorEl(click.currentTarget);
    setRandomTag(newTag);
  };
  const handleClose = () => {
    setRandomTag(null);
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <NavBar title={"DISCOVER. PLAY."}>
      <Button
        variant="contained"
        color="primary"
        className={classes.buttonText}
        onClick={generateRandomTag}
      >
        <b>Generate Random Tag</b>
      </Button>
      <Popover
        id="randomTagPopover"
        open={Boolean(randomTag)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={classes.popover}
      >
        <div className={classes.popoverContent}>
          <TagView {...(randomTag as tpp)} />
        </div>
      </Popover>
      <div style={{ flex: 1 }}></div>
      <LoginButton />
    </NavBar>
  );
};

const DashboardNav = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
        <SettingsIcon fontSize="large" />
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

export { HomeNav, DashboardNav };
