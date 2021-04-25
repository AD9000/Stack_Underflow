import React from "react";
import { HomeNav } from "../components/Navbar/HomeNav";
import { DashboardNav } from "../components/Navbar/DashboardNav";
import { makeStyles } from "@material-ui/styles";
import { useLocation } from "react-router-dom";
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
  background: {
    height: "100%",
    backgroundColor: "#051c3f",
  },
  page: {
    padding: "7rem 0",
    color: "white",
  },
  emphasise: {
    fontSize: "large",
  },
});

const AboutPage = () => {
  const classes = useStyles();
  const location = useLocation();

  const what = [
    "WorldPlay was inspired by the COVID-19 global pandemic that began in 2020.",
    "International travel was no longer a possibility, borders everywhere had shut down, and the internet became one's link to the rest of the world.",
    "With the rapid rise of music consumption and content streaming, along with the entire world world turning to social media, we found that there is no existing platform that celebrates the influences of music.",
    "WorldPlay was born from a desire to allow individuals to share their favourite songs, experiences and their culture with the world.",
  ];

  const tags = [
    "Tags contain a title, a song from Spotify, a caption and sometimes a photo.",
    "You can:",
  ];

  return (
    <div className={classes.background}>
      {location.state === "home" ? <HomeNav /> : <DashboardNav />}
      <Container maxWidth="md" className={classes.page}>
        <h1>About</h1>
        <p>
          Worldplay is where you go to
          <span className={classes.emphasise}>
            <i> share</i>
          </span>
          ,
          <span className={classes.emphasise}>
            <i> discover &</i>
          </span>
          <span className={classes.emphasise}>
            <i> connect</i>
          </span>
        </p>
        <br />
        <h2>What is WorldPlay?</h2>
        {what.map((line) => (
          <p>{line}</p>
        ))}
        <br />
        <h2>How does WorldPlay work?</h2>
        <p>
          After creating an account and logging in, you will be able to explore
          special posts called{" "}
          <span className={classes.emphasise}>
            <i>tags </i>
          </span>{" "}
          around the world map.
        </p>
        {tags.map((line) => (
          <p>{line}</p>
        ))}
        <ul>
          <li>
            Explore tags from around the world, learn about others' personal
            experiences, culture, travels and broaden your music taste.
          </li>
          <li>
            Create your own tags! Import songs that you love or mean a lot to
            you and share these with others.
          </li>
        </ul>
      </Container>
    </div>
  );
};

export { AboutPage };
