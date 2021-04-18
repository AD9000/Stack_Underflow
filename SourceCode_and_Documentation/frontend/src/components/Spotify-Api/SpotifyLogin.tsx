// import React from 'react'
import { makeStyles, Theme } from "@material-ui/core";
import "@fontsource/farro";
import { requestAuthorization } from './spotifyApi';

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    color: 'white'
  },
}));

const AUTH_URL = requestAuthorization();

// Handles the Login Spotify button
export default function LoginSpotify() {
  const styles = useStyles();

  return (
    <div>
      <a href={AUTH_URL} className={styles.btn}>
        <b>Log In with Spotify</b>
      </a>
    </div>
  )
}
