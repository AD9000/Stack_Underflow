import React, { useEffect } from "react";
import { Typography, Button, makeStyles, Theme } from "@material-ui/core";
import "@fontsource/farro";
import { HomeNav } from "../components/Navbar/HomeNav";
import globe from "../assets/globe.png";
import { RegisterDialog } from "../components/RegisterDialog";
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
}));

/**
 * Renders the Landing/Home Page for when user is not logged in
 * @returns {JSX.Element}
 */
const HomePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const toAbout = () =>
    history.push({
      // Navigates to About page
      pathname: "/about",
      state: "home",
    });

  useEffect(() => {
    const checkLoggedIn = () => {
      const isLoggedIn = localStorage.getItem("username");
      if (isLoggedIn) {
        history.push("/home");
      }
    };
    checkLoggedIn();
  }, [history]);

  return (
    <div className={classes.background}>
      <HomeNav />
      <div className={classes.intro}>
        <div className={classes.introTextWrapper}>
          <Typography
            className={classes.whiteText}
            style={{ fontSize: "xxx-large" }}
          >
            WorldPlay
          </Typography>
          <Typography className={classes.whiteText}>
            Use your Spotify favourites to connect and share your stories with
            people all around the world.
          </Typography>
          <Typography
            className={classes.whiteText}
            style={{ margin: "1rem 0" }}
          >
            Register now for free!
          </Typography>
          <div className={classes.horizontalFlex}>
            <RegisterDialog />
            <Button
              color="primary"
              className={classes.secondaryBtn}
              onClick={toAbout}
            >
              <b>More Info</b>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HomePage };
