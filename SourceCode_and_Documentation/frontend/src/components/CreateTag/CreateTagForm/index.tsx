import React, { useState, MouseEventHandler, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { searchSong } from "components/Spotify-Api/spotifyApi";
import CloseIcon from "@material-ui/icons/Close";
import { LatLngTuple } from "leaflet";
import { apiPublishTag } from "helpers/api";
import { AppContext } from "context/AppContext";
import { BackendTagBare, TagInfo } from "components/Interfaces";
import { ImageUpload } from "./ImagePreview";

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    textTransform: "none",
    fontFamily: "farro",
    fontSize: "x-large",
    margin: "0.5rem",
  },
  dialog: {
    backgroundColor: "#0f214a",
  },
  dialogTitle: {
    color: "white",
    fontFamily: "farro",
    fontSize: "x-large",
    textAlign: "center",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    fontFamily: "farro",
    backgroundColor: "#aad0ff",
  },
  blur: {
    backgroundColor: "rgb(255,255,255,0.3)",
    "& .MuiDialog-paper": {
      overflow: "hidden",
    },
  },
  text: {
    color: "white",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "auto auto",
  },
  closeBtn: {
    position: "absolute",
    color: "#3481e1",
    top: "0px",
    left: "300px",
  },
}));

interface CreateTagFormProps {
  createForm: boolean;
  handleClose: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  newMarker: LatLngTuple | null;
  hhClose: Function;
}

/**
 * The form that is used by the user to create a new tag on the map
 * @param { CreateTagFormProps }: functions to handle state update on creation of new tag
 * @returns
 */
const CreateTagForm = ({
  createForm,
  handleClose,
  newMarker,
  hhClose,
}: CreateTagFormProps) => {
  const [song, setSong] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const classes = useStyles();

  const { markers, setMarkers, tags, setTags } = useContext(AppContext);

  const handleSubmit = async () => {
    if (!newMarker) {
      return;
    }
    const songUri = await searchSong(song);

    const tagInfo: BackendTagBare = {
      title: title,
      region: "",
      location: newMarker?.join(" "),
      caption: caption,
      song_uri: songUri,
    };

    apiPublishTag(tagInfo, image).then(() => {
      setMarkers([...markers, newMarker]);

      // update the tags until next render
      const tf: TagInfo = {
        title,
        region: "",
        coords: newMarker,
        imgurl: imageUrl || "",
        desc: caption,
        song: { uri: songUri },
      };
      setTags([...tags, tf]);

      hhClose();
    });
  };

  return (
    <Dialog
      open={createForm}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.blur}
      maxWidth="sm"
      BackdropProps={{ style: { backgroundColor: "transparent" } }}
    >
      <div className={classes.dialog}>
        <DialogTitle id="form-dialog-title">
          <Typography className={classes.dialogTitle}>
            <b>Create A Tag</b>
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeBtn}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <div className={classes.grid}>
            <h3 className={classes.text}>Title</h3>
            <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              id="title"
              InputProps={{ className: classes.input }}
              placeholder="Enter Tag Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <h3 className={classes.text}>Caption</h3>
            <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              id="caption"
              size="medium"
              InputProps={{ className: classes.input }}
              placeholder="Enter your caption"
              onChange={(e) => setCaption(e.target.value)}
            />
            <h3 className={classes.text}>Song</h3>
            <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              id="song"
              InputProps={{ className: classes.input }}
              placeholder="Enter song name"
              onChange={(e) => setSong(e.target.value)}
            />
          </div>
          <ImageUpload setImage={setImage} setImageUrl={setImageUrl} />
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            variant="contained"
            style={{ background: "black" }}
            color="primary"
            className={classes.btn}
            onClick={handleSubmit}
          >
            <b style={{ fontSize: "large" }}>Next</b>
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export { CreateTagForm };
