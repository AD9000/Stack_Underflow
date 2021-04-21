import React, { useContext } from "react";
import { Container, makeStyles, Theme } from "@material-ui/core";
import { TagView } from "./TagView";
import { tpp } from "./Interfaces";
import { AppContext } from "./Context";

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
    flex: 1,
    overflowY: "scroll",
    borderRadius: "10px",
    backgroundColor: "#405B99",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const previewStyles = (imgurl: string) =>
  makeStyles((theme: Theme) => ({
    cardi: {
      display: "flex",
      flex: 1,
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
      backgroundImage: imgurl ? `url(${imgurl})` : "none",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundColor: "white",
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
  const { title, location, song, desc, imgurl, index, sstate } = props;
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
          <p style={{ textDecoration: "underline" }}>{song?.album}</p>
          <p>{desc.slice(0, 70)}...</p>
        </div>
      </div>
    </Container>
  );
};

const TagList = () => {
  const { tagIndex, setTagIndex, tags } = useContext(AppContext);
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {tagIndex === -1 ? (
        <div className={classes.taglist}>
          {tags.map((tj, index) => (
            <TagPreview
              key={index}
              {...tj}
              index={index}
              sstate={setTagIndex}
            />
          ))}
        </div>
      ) : (
        <TagView {...tags[tagIndex]} />
      )}
    </div>
  );
};

export { TagList };
