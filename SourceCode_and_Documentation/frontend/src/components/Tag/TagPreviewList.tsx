import React from "react";
import { makeStyles, Theme } from "@material-ui/core";

import { TagInfo } from "components/Interfaces";
import { TagPreview } from "./TagPreview";

export interface TagPreviewListProps {
  tags: TagInfo[];
}

const useStyles = makeStyles((theme: Theme) => ({
  taglist: {
    flex: 1,
    overflowY: "scroll",
    borderRadius: "10px",
    backgroundColor: "#405B99",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const TagPreviewList = ({ tags }: TagPreviewListProps) => {
  const classes = useStyles();
  return (
    <div className={classes.taglist}>
      {tags.map((tag, index) => (
        <TagPreview key={index} tag={tag} index={index} />
      ))}
    </div>
  );
};

export { TagPreviewList };
