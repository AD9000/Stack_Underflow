import React, { useState } from "react";
import { Button, Theme, makeStyles, Popover } from "@material-ui/core";
import { LoginForm } from "../LoginForm";
import { BackendTag, BackendTagToTagInfo, TagInfo } from "../Interfaces";
import { TagView } from "../Tag/TagView";
import { NavBar } from "./NavBar";
import { apiRandomTag } from "helpers/api";

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
      maxWidth: "33rem",
      borderRadius: "10px",
      backgroundColor: "#0f214a",
    },
  },
  popoverContent: {
    backgroundColor: "#0f214a",
    padding: theme.spacing(4),
    color: "white",
  },
}));

/**
 * The Navbar as it appears on the home (non-logged in) page
 * Extension of the NavBar component
 * @returns {JSX.Element}
 */
const HomeNav = () => {
  const [randomTag, setRandomTag] = useState<TagInfo | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const generateRandomTag = (
    click: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    click.preventDefault();

    apiRandomTag()
      .then((res) => {
        return res.json();
      })
      .then((tagInfo: BackendTag) => {
        const tInf = BackendTagToTagInfo(tagInfo);
        setRandomTag(tInf);
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
          {randomTag?.imgurl && <TagView {...randomTag} />}
        </div>
      </Popover>
      <div style={{ flex: 1 }}></div>
      <LoginForm />
    </NavBar>
  );
};

export { HomeNav };
