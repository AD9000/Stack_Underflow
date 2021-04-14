import React, { useContext } from "react";
import { Container, makeStyles, Theme } from "@material-ui/core";
import { TagView } from "./TagView";
import { TagPrevProps, tpp } from "./Interfaces";
import { AppContext } from "./Context";

const tagjson: TagPrevProps[] = [
  {
    title: "The Ocean's Beauty",
    location: "Tasmania",
    album: "I Lived - One Republic",
    desc: `I'm proud to be from New Zealand! My favourite Maori saying is: 
      'Ka Kite Ano', meaning "See you tomorrow". However, my number one
      favourite thing about my culture is that there is a legend for everthing. 
      Mountains? Yep. Rivers? Yep. Lakes? Yep! I hope you get a chance to visit
      my beautiful country, I guarantee you'll fall in love!`,
    imgurl: "https://ak5.picdn.net/shutterstock/videos/1014147545/thumb/1.jpg",
  },
  {
    title: "Memories Stay",
    location: "UNSW",
    album: "The End of the Road - Boyz II Men",
    desc: `I can't believe graduation is here... One day I'm praying to finish
      uni already and the next I can't bring myself to leave the campus. I'm
      grateful for the way my university experience has shaped me, and I'm glad
      I decided not to drop out in first year.`,
    imgurl:
      "https://www.universitiesaustralia.edu.au/wp-content/uploads/2019/05/UNSW-2020_Web-2-1333x1000.jpg",
  },
  {
    title: "Thrill of My Life",
    location: "Luna Park",
    album: "Happy - Pharell Williams",
    desc: `So many fond memories visiting Luna Park as a little boy. My mum would hug me
      every time we went on the ferris wheel because I was scared (even though it was my 
      favourite ride!!) She was so patient with me when I couldn't decide on an ice cream 
      I miss her every day.`,
    imgurl:
      "https://media-cdn.tripadvisor.com/media/photo-s/1a/70/42/90/luna-park-sydney.jpg",
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  // "@global": {
  //   "&::-webkit-scrollbar": {
  //     width: "0.4em",
  //   },
  //   "&::-webkit-scrollbar-track": {
  //     boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  //     webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  //   },
  //   "&::-webkit-scrollbar-thumb": {
  //     backgroundColor: "rgba(0,0,0,.1)",
  //     outline: "1px solid blue",
  //   },
  // },
  wrapper: {
    overflow: "hidden",
    flex: 1,
    display: "flex",
    height: "90%",
    padding: theme.spacing(4),
    paddingTop: 0,
  },
  wrap: {
    display: "flex",
  },
  user: {
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  desc: {
    padding: theme.spacing(2),
    maxWidth: "100%",
    wordWrap: "break-word",
  },
  taglist: {
    overflowY: "scroll",
    borderRadius: "10px",
    backgroundColor: "#405B99",
    padding: theme.spacing(2),
  },
}));

const previewStyles = (imgurl: string) =>
  makeStyles((theme: Theme) => ({
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
      borderRadius: "10px",
      marginRight: theme.spacing(2),
      backgroundImage: `url(${imgurl})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
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
  }))();

interface clickProps {
  index: number;
  sstate: Function;
}

const handleClick = ({ index, sstate }: clickProps) => {
  sstate(index);
};

const TagPreview = (props: tpp) => {
  const { title, location, album, desc, imgurl, index, sstate } = props;
  const classes = previewStyles(imgurl);
  return (
    <Container
      style={{ cursor: "pointer" }}
      onClick={() => handleClick({ index, sstate })}
    >
      <div className={classes.cardi}>
        <div className={classes.cimagewrap}>
          {/* <img alt={imgurl} src={imgurl} style={{ width: "100%" }} /> */}
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
  const { tagIndex, setTagIndex } = useContext(AppContext);
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {tagIndex === -1 ? (
        <div className={classes.taglist}>
          {tagjson.map((tj, index) => (
            <TagPreview
              key={index}
              {...tj}
              index={index}
              sstate={setTagIndex}
            />
          ))}
        </div>
      ) : (
        <TagView {...tagjson[tagIndex]} index={-1} sstate={setTagIndex} />
      )}
    </div>
  );
};

export { TagList };
