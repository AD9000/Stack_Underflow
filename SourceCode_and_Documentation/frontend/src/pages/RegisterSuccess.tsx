// import React from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/styles";
import { handleRedirect } from '../components/Spotify-Api/spotifyApi';
import { Container, Button } from "@material-ui/core";

const useStyles = makeStyles({
  background: {
    height: "100%",
    backgroundColor: "#051c3f"
  },
  page: {
    textAlign: 'center',
    padding: '2rem 0',
    color: 'white'
  },
  btn: {
    textTransform: "none",
    fontFamily: "farro",
    fontSize: "x-large",
    margin: "0.5rem",
  },
})

// Change name
export default function RegisterSuccess() {
  const classes = useStyles();
  let history = useHistory();

  const handleButton = () => {
    history.push('/home');
  }

  // Removes code from url, and uses it to fetch access/refresh tokens
  handleRedirect();

  return (
    <div className={classes.background}>
      <Container className={classes.page}>
        <h1>Congratulations! Your account has been created.</h1>
        <p>Click the button below to return to WorldPlay.</p>
        <Button 
          variant="contained"
          color="primary"
          onClick={handleButton}
          className={classes.btn}>
            <b>Go</b>
        </Button>
      </Container>
    </div>
  );
}

export { RegisterSuccess };