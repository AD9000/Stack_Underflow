import React, { useState } from "react";
import { Button, Theme, makeStyles, Popover } from "@material-ui/core";
import LoginButton from "../LoginButton";
import reefPic from "../../assets/reef.jpeg";
import { BackendTag, TagInfo, tpp } from "../Interfaces";
import { TagView } from "../TagView";
import { NavBar } from "./NavBar";
import { api } from "../../Helpers/api";

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

const fileToDataUrl = (file: any) => {
  const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  const valid = validFileTypes.find((type) => type === file.media_type);
  // Bad data, let's walk away.
  // console.log(file);
  if (!valid) {
    throw Error("provided file is not a png, jpg or jpeg image.");
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
};

const HomeNav = () => {
  const [randomTag, setRandomTag] = useState<TagInfo | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const generateRandomTag = (
    click: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    click.preventDefault();

    fetch(`${api}generateRandomTag`)
      .then((res) => {
        return res.json();
      })
      .then((tagInfo: BackendTag) => {
        const {
          region,
          username,
          image,
          title,
          location,
          song_uri,
          caption,
        } = tagInfo;
        const cod = location.split(" ").map((l) => Number(l));
        console.log(image);
        // fileToDataUrl(image).then((res) => {
        const tInf: TagInfo = {
          region,
          username,
          title,
          location,
          imgurl: "",
          song: { uri: song_uri },
          desc: caption,
          coords: [cod[0], cod[1]],
        };
        setRandomTag(tInf);
        setAnchorEl(click.currentTarget);
        // });
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
