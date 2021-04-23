import React, { useContext } from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { TagView } from "./TagView";
import { AppContext } from "../Context";
import { TagPreview } from "./TagPreview";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    flex: 1,
    overflow: "hidden",
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

const TagList = () => {
  const { tagIndex, tags } = useContext(AppContext);
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {tagIndex === -1 ? (
        <div className={classes.taglist}>
          {tags.map((tj, index) => (
            <TagPreview key={index} tag={tj} index={index} />
          ))}
        </div>
      ) : (
        <TagView {...tags[tagIndex]} />
      )}
    </div>
  );
};

export { TagList };
