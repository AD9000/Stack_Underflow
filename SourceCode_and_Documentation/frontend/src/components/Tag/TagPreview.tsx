import React, { useContext } from "react";
import { Container, makeStyles, Theme } from "@material-ui/core";
import { TagInfo } from "../Interfaces";
import { AppContext } from "../Context";

const useStyles = (imgurl: string) =>
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
      backgroundImage: `url(${imgurl})`,
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

export interface TagPreviewProps {
  tag: TagInfo;
  index: number;
}

const TagPreview = ({ tag, index }: TagPreviewProps) => {
  const { setTagIndex } = useContext(AppContext);
  const { title, location, song, desc, imgurl } = tag;
  const classes = useStyles(imgurl);

  const handleClick = () => {
    setTagIndex(index);
  };

  return (
    <Container style={{ cursor: "pointer" }} onClick={() => handleClick()}>
      <div className={classes.cardi}>
        <div className={classes.cimagewrap} />
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

export { TagPreview };
