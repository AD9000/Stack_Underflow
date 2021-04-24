import React, { useEffect, useState } from "react";
import { Container, makeStyles, Theme } from "@material-ui/core";
import { api } from "helpers/api";
import { getToken } from "helpers/token";
import { TagPreviewList } from "components/Tag/TagPreviewList";
import {
  BackendTag,
  BackendTagToTagInfo,
  TagInfo,
} from "components/Interfaces";
import { TagPreview } from "components/Tag/TagPreview";

const useStyles = makeStyles((theme: Theme) => ({
  page: {
    color: "white",
    padding: "5rem 0",
  },
  wrapper: {
    backgroundColor: "#405B99",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    borderRadius: "10px",
  },
}));

/**
 * Renders the list of tags that the user has made
 * @returns JSX.Element: The List of tags that the user has made,
 * or a message stating that they have none
 */
const MyTags = () => {
  const classes = useStyles();
  const [userTags, setUserTags] = useState<TagInfo[]>([]);
  const username = getToken("username");

  const fetchTags = async () => {
    const result = await fetch(`${api}myTags/${username}`);
    console.log(result);
    if (result.status === 200) {
      const r: BackendTag[] = await result.json();

      if (r.length) {
        setUserTags(r.map((tag) => BackendTagToTagInfo(tag)));
      }
    }
  };
  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <Container maxWidth="lg" className={classes.page}>
      <h1>My Tags</h1>
      <div>
        {userTags ? (
          userTags.map((tag, index) => (
            <div className={classes.wrapper}>
              <TagPreview tag={tag} index={index} />
            </div>
          ))
        ) : (
          <p>No tags found. Try posting one!</p>
        )}
      </div>
    </Container>
  );
};

export { MyTags };
