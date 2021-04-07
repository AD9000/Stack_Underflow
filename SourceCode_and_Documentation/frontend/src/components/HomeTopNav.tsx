import React from "react";
import { AppBar, Toolbar, Button, Theme, makeStyles } from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import LoginButton from "./LoginButton";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: "#000006",
    fontFamily: "farro",
    justifyContent: "space-between",
    padding: theme.spacing(0.5),
    maxHeight: "8%",
  },
  toolBar: {
    display: "flex",
    flex: 1,
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
    fontFamily: "farro",
    margin: "0.5rem",
  },
  title: {
    marginRight: theme.spacing(2),
    fontFamily: "farro",
  },
  playButton: {
    marginRight: theme.spacing(2),
    fontSize: "2.6rem",
    marginTop: theme.spacing(-0.6),
  },
  settings: {
    padding: theme.spacing(1),
    fontSize: "2.6rem",
  },
}));

const HomeTopNav = ({ signin }: { signin?: boolean }) => {
  const styles = useStyles();
  return (
    <AppBar position="fixed" className={styles.appBar}>
      <Toolbar className={styles.toolBar}>
        <PlayCircleOutlineIcon fontSize="large" className={styles.playButton} />
        <h1 className={styles.title}>DISCOVER. PLAY.</h1>
        <Button
          variant="contained"
          color="primary"
          className={styles.buttonText}
        >
          <b>Generate Random Tag</b>
        </Button>
        <div style={{ flex: 1 }}></div>
        {signin ? null : <LoginButton />}
        <a href="#" className={styles.whiteText}>
          <SettingsIcon fontSize="large" className={styles.settings} />
        </a>
      </Toolbar>
    </AppBar>
  );
};

HomeTopNav.defaultProps = {
  signin: false,
};

export { HomeTopNav };
