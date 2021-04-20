import React from 'react'
import { makeStyles, Theme } from "@material-ui/core";
import "@fontsource/farro";

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    color: 'white'
  },
}));

const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=aad2301edd774feba0ad6a82822c64dc&response_type=code&redirect_uri=http://localhost:3000/register/success&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function LoginSpotify() {
  const styles = useStyles();

  return (
    <div>
        <a href={AUTH_URL} className={styles.btn}>
          <b> Log In with Spotify</b>
        </a>
    </div>
  )
}
