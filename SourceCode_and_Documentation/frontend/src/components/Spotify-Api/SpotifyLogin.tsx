import React from "react";
import { makeStyles } from "@material-ui/core";
import "@fontsource/farro";
import { requestAuthorization } from "./spotifyApi";

const useStyles = makeStyles({
  btn: {
    color: "white",
  },
});

const AUTH_URL = requestAuthorization();

/**
 * Handles the Login Spotify button
 */
const SpotifyLogin = () => {
  const styles = useStyles();

  return (
    <div>
      <a href={AUTH_URL} className={styles.btn}>
        <b>Log In with Spotify</b>
      </a>
    </div>
  );
};

export { SpotifyLogin };
