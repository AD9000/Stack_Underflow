import React, { ReactNode, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Theme,
  makeStyles,
  Popover,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import LoginButton from "./LoginButton";
import CloseIcon from "@material-ui/icons/Close";
import reefPic from "../assets/reef.jpeg";
import playButton from "../assets/playButton.png";
import { Link } from "react-router-dom";
import { TagInfo, tpp } from "./Interfaces";
import { TagView } from "./TagView";

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
}));

interface NavBarProps {
  title: string;
  children?: ReactNode;
}

const NavBar = ({ children, title }: NavBarProps) => {
  const styles = useStyles();
  return (
    <AppBar position="fixed" className={styles.appBar}>
      <Toolbar className={styles.toolBar}>
        <div className={styles.playWrapper}>
          <Link to="/home">
            <img
              alt={"app logo (play button)"}
              src={playButton}
              className={styles.playButton}
            />
          </Link>
        </div>
        <Typography variant="h4" className={styles.title}>
          {title}
        </Typography>
        {children}
        <div>
          <Link to="/" className={styles.whiteText}>
            <SettingsIcon className={styles.settings} />
          </Link>
        </div>
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

export { HomeNav };
