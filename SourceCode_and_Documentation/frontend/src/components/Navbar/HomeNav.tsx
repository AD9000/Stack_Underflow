import React, { useState } from "react";
import { Button, Theme, makeStyles, Popover } from "@material-ui/core";
import LoginButton from "../LoginButton";
import reefPic from "../../assets/reef.jpeg";
import { TagInfo, tpp } from "../Interfaces";
import { TagView } from "../TagView";
import { NavBar } from "./NavBar";

const useStyles = makeStyles((theme: Theme) => ({
  buttonText: {
    textTransform: "none",
    margin: "0.5rem",
    fontFamily: "farro",
  },
  popover: {
    marginTop: theme.spacing(2),
    maxHeight: "55%",
    display: "flex",
    justifyContent: "center",
    "& .MuiPopover-paper": {
      maxWidth: "30rem",
      borderRadius: "10px",
      backgroundColor: "#0f214a",
    },
  },
  popoverContent: {
    backgroundColor: "#0f214a",
    color: "white",
  },
}));

const HomeNav = () => {
  const [randomTag, setRandomTag] = useState<TagInfo | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const generateRandomTag = (
    click: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    click.preventDefault();

    fetch("/generateRandomTag")
      .then((res) => {
        // console.log("status: ", res.status);
        // // data.text().then((t) => console.log(t));
        return res.json();
      })
      .then((tagInfo) => {
        setRandomTag(tagInfo);
        setAnchorEl(click.currentTarget);
      });
  };

  const handleClose = () => {
    setRandomTag(null);
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <NavBar title={"DISCOVER. PLAY."}>
      <Button
        variant="contained"
        color="primary"
        className={classes.buttonText}
        onClick={generateRandomTag}
      >
        <b>Generate Random Tag</b>
      </Button>
      <Popover
        id="randomTagPopover"
        open={Boolean(randomTag)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={classes.popover}
      >
        <div className={classes.popoverContent}>
          <TagView {...(randomTag as tpp)} />
        </div>
      </Popover>
      <div style={{ flex: 1 }}></div>
      <LoginButton />
    </NavBar>
  );
};

export { HomeNav };
