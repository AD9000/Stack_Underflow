import React from "react";
import { TagInfo } from "../Interfaces";
import { MusicPlayer } from "../Spotify-Api/MusicPlayer";
import { Container, makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = (imgurl: string) =>
  makeStyles((theme: Theme) => ({
    wrapper: {
      display: "flex",
      padding: 0,
    },
    cardi: {
      flex: 1,
      display: "flex",
      height: "90%",
      flexDirection: "column",
      padding: theme.spacing(2),
      borderRadius: "10px",
      backgroundColor: "#405B99",
      color: "white",
    },
    cimagewrap: {
      flex: 1,
      backgroundImage: `url(${imgurl})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundColor: "white",
      minHeight: "180px",
      minWidth: "100px",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      borderRadius: "10px",
    },
    textwrap: {
      flex: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      "&>*": {
        margin: theme.spacing(0.5),
      },
    },
    wrap: {
      flex: 2,
      display: "flex",
    },
    user: {
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
    desc: {
      flex: 1,
      display: "flex",
      alignContent: "flex-end",
      padding: theme.spacing(2),
      maxWidth: "100%",
      wordWrap: "break-word",
    },
  }))();

const TagView = ({
  title,
  username,
  location,
  desc,
  imgurl,
  song,
}: TagInfo) => {
  const classes = useStyles(imgurl);
  return (
    <Container className={classes.wrapper}>
      <div className={classes.cardi}>
        <div className={classes.user}>{username}</div>
        <div className={classes.wrap}>
          <div className={classes.cimagewrap} />
          <div className={classes.textwrap}>
            <h2>{title}</h2>
            <h3>{location}</h3>
            {song?.uri && <MusicPlayer songUri={song.uri} />}
          </div>
        </div>
        <div className={classes.desc}>
          <Typography
            style={{
              maxWidth: "100%",
              whiteSpace: "normal",
            }}
          >
            {desc}
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export { TagView };
