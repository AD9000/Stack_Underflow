import React, { useState } from "react";
import { Container, makeStyles, Theme } from "@material-ui/core";
import { TagView } from "./TagView";
import { TagPrevProps, tpp } from "./Interfaces";

const tagjson: TagPrevProps[] = [
  {
    title: "The Ocean's Beauty",
    location: "Tasmania",
    album: "I Lived - One Republic",
    desc: `Proud to be from New Zealand! Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nam at augue sed ex venenatis ornare eu
      et sapien. Curabitur at est quis diam vehicula aliquam. Cras id
      dignissim ante, ac bibendum lacus.`,
    imgurl: "https://ak5.picdn.net/shutterstock/videos/1014147545/thumb/1.jpg",
  },
  {
    title: "Memories Stay",
    location: "UNSW",
    album: "The End of the Road - Boyz II Men",
    desc: `Proud to be from New Zealand! Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nam at augue sed ex venenatis ornare eu
      et sapien. Curabitur at est quis diam vehicula aliquam. Cras id
      dignissim ante, ac bibendum lacus.`,
    imgurl:
      "https://www.universitiesaustralia.edu.au/wp-content/uploads/2019/05/UNSW-2020_Web-2-1333x1000.jpg",
  },
  {
    title: "Thrill of My Life",
    location: "Luna Park",
    album: "Happy - Pharell Williams",
    desc: `Proud to be from New Zealand! Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nam at augue sed ex venenatis ornare eu
      et sapien. Curabitur at est quis diam vehicula aliquam. Cras id
      dignissim ante, ac bibendum lacus.  `,
    imgurl:
      "https://media-cdn.tripadvisor.com/media/photo-s/1a/70/42/90/luna-park-sydney.jpg",
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  cardi: {
    display: "flex",
    color: "white",
    overflow: "hidden",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cimagewrap: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    // width: "400px",
    borderRadius: "10px",
    paddingRight: theme.spacing(1),
    // backgroundImage: "https://source.unsplash.com/random/500x500",
    // backgroundSize: "cover",
  },
  textwrap: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 2,
    whiteSpace: "normal",
    "&>*": {
      margin: theme.spacing(0.5),
    },
  },
  wrap: {
    display: "flex",
  },
  user: {
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  desc: {
    // display: "flex",
    padding: theme.spacing(2),
    maxWidth: "100%",
    wordWrap: "break-word",
  },
  taglist: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    overflowY: "scroll",
    borderRadius: "10px",
    backgroundColor: "#405B99",
    maxHeight: "85%",
  },
}));

interface clickProps {
  index: number;
  sstate: Function;
}

const handleClick = ({ index, sstate }: clickProps) => {
  sstate(index);
};

const TagPreview = (props: tpp) => {
  const { title, location, album, desc, imgurl, index, sstate } = props;
  const classes = useStyles();
  return (
    <Container onClick={() => handleClick({ index, sstate })}>
      <div className={classes.cardi}>
        <div className={classes.cimagewrap}>
          <img src={imgurl} style={{ width: "100%" }} />
        </div>
        <div className={classes.textwrap}>
          <h4>
            {title}-{location}
          </h4>
          <p style={{ textDecoration: "underline" }}>{album}</p>
          <p>{desc.slice(0, 70)}...</p>
        </div>
      </div>
    </Container>
  );
};

const TagList = () => {
  const [open, setOpen] = useState(-1);
  const classes = useStyles();
  return (
    <div style={{ overflow: "hidden" }}>
      {open === -1 ? (
        <div className={classes.taglist}>
          {tagjson.map((tj, index) => (
            <TagPreview {...tj} index={index} sstate={setOpen} />
          ))}
        </div>
      ) : (
        <TagView {...tagjson[open]} index={-1} sstate={setOpen} />
      )}
    </div>
  );
};

export { TagList };
