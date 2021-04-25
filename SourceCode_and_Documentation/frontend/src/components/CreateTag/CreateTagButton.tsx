import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../Context";

const useStyles = makeStyles({
  buttonText: {
    textTransform: "none",
    fontFamily: "farro",
    margin: "0.5rem",
  },
});

/**
 * Renders the button to create a tag. A user can click on it,
 * and then click on the map to place a tag and start sharing
 * their experiences!
 * @returns JSX.Element: The button that can be used to go into create tag mode
 */
const CreateTagButton = () => {
  const styles = useStyles();
  const { createTag, setCreateTag } = useContext(AppContext);

  const handleClickOpen = () => {
    setCreateTag(!createTag);
  };

  return (
    <div>
      <Button
        variant="contained"
        color={createTag ? "secondary" : "primary"}
        className={styles.buttonText}
        onClick={handleClickOpen}
      >
        <b>Create A Tag</b>
      </Button>
    </div>
  );
};

export { CreateTagButton };
