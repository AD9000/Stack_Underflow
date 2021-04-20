import React from "react";
import { Typography, Button, makeStyles, Theme } from "@material-ui/core";
import "@fontsource/farro";
import { HomeNav } from "../components/Navbar/HomeNav";
import globe from "../assets/globe.png";
import RegisterDialogue from "../components/RegisterDialogue";
import { useHistory } from "react-router-dom"; 

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    backgroundImage: `url(${globe})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  whiteText: {
    color: "white",
    fontFamily: "farro",
    fontWeight: "bold",
  },
  btn: {
    textTransform: "none",
    fontFamily: "farro",
    fontSize: "x-large",
    margin: "0.5rem",
  },
  secondaryBtn: {
    textTransform: "none",
    fontFamily: "farro",
    backgroundColor: "#262626",
    color: "white",
    fontSize: "x-large",
    margin: "0.5rem",
  },
  intro: {
    paddingTop: theme.spacing(10),
    width: "50%",
    alignSelf: "flex-end",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  introTextWrapper: {
    width: "20rem",
  },
  horizontalFlex: {
    display: "flex",
    flexDirection: "row",
  },
  link: {
    colour: "white",
    backgroundColor: "white"
  }
}));

const HomePage = () => {
  const styles = useStyles();
  const history = useHistory();
  const toAbout = () => history.push({
    // Navigates to About page
    pathname: '/about',
    state: "home"
  })
  
  return (
    <div className={styles.background}>
      <HomeNav />
      <div className={styles.intro}>
        <div className={styles.introTextWrapper}>
          <Typography
            className={styles.whiteText}
            style={{ fontSize: "xxx-large" }}
          >
            WorldPlay
          </Typography>
          <Typography className={styles.whiteText}>
            Use your Spotify favourites to connect and share your stories with
            people all around the world.
          </Typography>
          <Typography className={styles.whiteText} style={{ margin: "1rem 0" }}>
            Register now for free!
          </Typography>
          <div className={styles.horizontalFlex}>
            <RegisterDialogue />
            <Button color="primary" className={styles.secondaryBtn} onClick={toAbout}>
              <b>More Info</b>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HomePage };
