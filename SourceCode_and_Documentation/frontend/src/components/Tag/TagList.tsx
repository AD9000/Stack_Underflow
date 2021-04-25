import React, { useContext } from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { TagView } from "./TagView";
import { AppContext } from "context/AppContext";
import { TagPreviewList } from "./TagPreviewList";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    flex: 1,
    overflow: "hidden",
    display: "flex",
    height: "90%",
    padding: theme.spacing(4),
    paddingTop: 0,
  },
}));

/**
 * Renders a list of tags, tagviews to be specific
 * @returns {JSX.Element}
 */
const TagList = () => {
  const { tagIndex, tags } = useContext(AppContext);
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {tagIndex === -1 ? (
        <TagPreviewList tags={tags} />
      ) : (
        <TagView {...tags[tagIndex]} />
      )}
    </div>
  );
};

export { TagList };
