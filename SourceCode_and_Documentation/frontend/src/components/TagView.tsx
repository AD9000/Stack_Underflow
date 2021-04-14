import {
  Button,
  Container,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { tpp } from "./Interfaces";

// const randImgurl =
//   "https://images.unsplash.com/photo-1617339648529-76cbe1cea71b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixlib=rb-1.2.1&q=80&w=300";

const useStyles = (imgurl: string) =>
  makeStyles((theme: Theme) => ({
    wrapper: {
      display: "flex",
      padding: 0,
    },
    cardi: {
      display: "flex",
      height: "90%",
      flexDirection: "column",
      padding: theme.spacing(2),
      borderRadius: "10px",
      backgroundColor: "#405B99",
      color: "white",
    },
    cimagewrap: {
      backgroundImage: `url(${imgurl})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: "100%",
      flex: 1,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      borderRadius: "10px",
    },
    textwrap: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      flex: 2,
      "&>*": {
        margin: theme.spacing(0.5),
      },
    },
    wrap: {
      display: "flex",
      flex: 2,
    },
    user: {
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
    desc: {
      display: "flex",
      flex: 1,
      alignContent: "flex-end",
      padding: theme.spacing(2),
      maxWidth: "100%",
      wordWrap: "break-word",
    },
  }))();

const TagView = ({ title, username, location, desc, imgurl, sstate }: tpp) => {
  const classes = useStyles(imgurl);
  return (
    <Container className={classes.wrapper}>
      {/* <Button
        onClick={() => sstate(-1)}
        style={{
          color: "white",
          border: "1px solid white",
          marginLeft: "1rem",
        }}
      >
        Back
      </Button> */}
      <div className={classes.cardi}>
        <div className={classes.user}>{username}</div>
        <div className={classes.wrap}>
          <div className={classes.cimagewrap}>
            {/* <img alt={imgurl} src={imgurl} style={{ maxWidth: "100%" }} /> */}
          </div>
          <div className={classes.textwrap}>
            <h2>{title}</h2>
            <h3>{location}</h3>
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
