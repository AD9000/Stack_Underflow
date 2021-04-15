import React, { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  Theme,
  makeStyles,
  Typography,
} from "@material-ui/core";
import playButton from "../../assets/playButton.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: "#000006",
    fontFamily: "farro",
    justifyContent: "space-between",
    padding: theme.spacing(0.5),
    maxHeight: "10vh",
  },
  toolBar: {
    display: "flex",
    flex: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  title: {
    marginRight: theme.spacing(2),
  },
  playButton: {
    marginRight: theme.spacing(2),
    maxWidth: "70%",
  },
  playWrapper: {
    display: "flex",
    justifyContent: "center",
  },
}));

interface NavBarProps {
  title: string;
  children?: ReactNode;
}

const NavBar = ({ children, title }: NavBarProps) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <div className={classes.playWrapper}>
          <Link to="/home">
            <img
              alt={"app logo (play button)"}
              src={playButton}
              className={classes.playButton}
            />
          </Link>
        </div>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};

export { NavBar };
