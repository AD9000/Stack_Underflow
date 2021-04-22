import React, { useState } from "react";
import { Button, Theme, makeStyles, Popover } from "@material-ui/core";
import LoginButton from "../LoginButton";
import reefPic from "../../assets/reef.jpeg";
import { BackendTag, TagInfo, tpp } from "../Interfaces";
import { TagView } from "../TagView";
import { NavBar } from "./NavBar";
import { api } from "../../Helpers/api";

const tagjson: TagInfo[] = [
  {
    title: "The Ocean's Beauty",
    location: "Tasmania",
    desc: `I'm proud to be from New Zealand! My favourite Maori saying is: 
      'Ka Kite Ano', meaning "See you tomorrow". However, my number one
      favourite thing about my culture is that there is a legend for everthing. 
      Mountains? Yep. Rivers? Yep. Lakes? Yep! I hope you get a chance to visit
      my beautiful country, I guarantee you'll fall in love!`,
    imgurl: "https://ak5.picdn.net/shutterstock/videos/1014147545/thumb/1.jpg",
    coords: [-33.86785, 151.20732],
    song: {
      name: "i lived",
      album: "I Lived - One Republic",
      uri: "spotify:track:3IQF4xCQUPicbA4hWfTxPo",
    },
  },
  {
    title: "Memories Stay",
    location: "UNSW",
    desc: `I can't believe graduation is here... One day I'm praying to finish
      uni already and the next I can't bring myself to leave the campus. I'm
      grateful for the way my university experience has shaped me, and I'm glad
      I decided not to drop out in first year.`,
    imgurl:
      "https://www.universitiesaustralia.edu.au/wp-content/uploads/2019/05/UNSW-2020_Web-2-1333x1000.jpg",
    coords: [-43.52565, 172.639847],
    song: {
      name: "the end of the road",
      album: "The End of the Road - Boyz II Men",
      uri: "spotify:track:794U3ttupMPMfgZo0CT6NF",
    },
  },
  {
    title: "Thrill of My Life",
    location: "Luna Park",
    desc: `So many fond memories visiting Luna Park as a little boy. My mum would hug me
      every time we went on the ferris wheel because I was scared (even though it was my 
      favourite ride!!) She was so patient with me when I couldn't decide on an ice cream 
      I miss her every day.`,
    imgurl:
      "https://media-cdn.tripadvisor.com/media/photo-s/1a/70/42/90/luna-park-sydney.jpg",
    coords: [-42.87936, 147.32941],
    song: {
      name: "happy",
      album: "Happy - Pharell Williams",
      uri: "spotify:track:60nZcImufyMA1MKQY3dcCH",
    },
  },
  {
    region: "Australia",
    username: "Anonymous",
    title: "Beautiful Experience!",
    imgurl: reefPic,
    location: "Queensland",
    song: {
      name: "Water",
      artist: "Kanye West",
    },
    desc: `Being underwater is such a surreal experience, one that I
    can't compare to anything else! My favourite lyric in this
    song is "Clean us like the rain in spring... Let Your light
    reflect on me" Can't wait until I see the ocean again!!!`,
    coords: [-16.49941, 145.465908],
  },
];

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

    // fetch(`${api}generateRandomTag`)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((tagInfo: BackendTag) => {
    //     const {
    //       region,
    //       username,
    //       image,
    //       title,
    //       location,
    //       song_uri,
    //       caption,
    //     } = tagInfo;
    //     const cod = location.split(" ").map((l) => Number(l));
    //     console.log(image);
    //     // fileToDataUrl(image).then((res) => {
    //     const tInf: TagInfo = {
    //       region,
    //       username,
    //       title,
    //       location,
    //       imgurl: "https://source.unsplash.com/random",
    //       song: { uri: song_uri },
    //       desc: caption,
    //       coords: [cod[0], cod[1]],
    //     };
    //     // setRandomTag(tInf);

    //     // setRandomTag(tagjson[Math.floor(Math.random() * 4)]);
    //     // setAnchorEl(click.currentTarget);
    //     // });
    //   });

    setRandomTag(tagjson[Math.floor(Math.random() * 4)]);
    setAnchorEl(click.currentTarget);
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
      <LoginButton />
    </NavBar>
  );
};

export { HomeNav };
