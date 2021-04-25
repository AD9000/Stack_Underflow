import React, {
  useState,
  MouseEventHandler,
  useEffect,
  useContext,
} from "react";
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
import { getToken } from "helpers/token";
import { LatLngTuple } from "leaflet";
import { api } from "helpers/api";
import { AppContext } from "components/Context";
import { TagInfo } from "components/Interfaces";
import { ImageUpload } from "./ImagePreview";

const useStyles = makeStyles((theme: Theme) => ({
  buttonText: {
    textTransform: "none",
    fontFamily: "farro",
    margin: "0.5rem",
  },
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
  dialogContent: {
    display: "flex",
    flexDirection: "column",
  },
  horizontalFlex: {
    display: "flex",
    flexDirection: "row",
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
  zoomControl: {
    margin: theme.spacing(2),
  },
}));

interface NewTagFormProps {
  createForm: boolean;
  handleClose: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  newMarker: LatLngTuple | null;
  hhClose: Function;
}

const NewTagForm = ({
  createForm,
  handleClose,
  newMarker,
  hhClose,
}: NewTagFormProps) => {
  const [song, setSong] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const styles = useStyles();

  const { markers, setMarkers, tags, setTags } = useContext(AppContext);

  useEffect(() => {
    console.log("image changed: ", image);
  }, [image]);

  const handleSubmit = async () => {
    if (!newMarker) {
      return;
    }

    const songUri = await searchSong(song);
    const username = getToken("username");

    const tf: TagInfo = {
      title,
      region: "",
      coords: newMarker,
      imgurl: imageUrl || "",
      desc: caption,
      song: { uri: songUri },
    };

    const tagInfo = {
      title: title,
      region: "",
      location: newMarker?.join(" "),
      caption: caption,
      song_uri: songUri,
    };

    console.log(JSON.stringify(tagInfo));
    console.log(image);

    const body = new FormData();
    body.append("tagInf", JSON.stringify(tagInfo));
    if (image) {
      body.append("img", image);
    }

    fetch(`${api}publishTag/${username}`, {
      method: "POST",
      body: body,
    }).then(() => {
      setMarkers([...markers, newMarker]);
      setTags([...tags, tf]);

      hhClose();
    });
  };

  return (
    <Dialog
      open={createForm}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={styles.blur}
      maxWidth="sm"
      BackdropProps={{ style: { backgroundColor: "transparent" } }}
    >
      <div className={styles.dialog}>
        <DialogTitle id="form-dialog-title">
          <Typography className={styles.dialogTitle}>
            <b>Create A Tag</b>
          </Typography>
          <IconButton
            aria-label="close"
            className={styles.closeBtn}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <div className={styles.grid}>
            <h3 className={styles.text}>Title</h3>
            <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              id="title"
              InputProps={{ className: styles.input }}
              placeholder="Enter Tag Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <h3 className={styles.text}>Caption</h3>
            <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              id="caption"
              size="medium"
              InputProps={{ className: styles.input }}
              placeholder="Enter your caption"
              onChange={(e) => setCaption(e.target.value)}
            />
            <h3 className={styles.text}>Song</h3>
            <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              id="song"
              InputProps={{ className: styles.input }}
              placeholder="Enter song name"
              onChange={(e) => setSong(e.target.value)}
            />
          </div>
          <ImageUpload setImage={setImage} setImageUrl={setImageUrl} />
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* <Button
            variant="contained"
            style={{ background: "black" }}
            color="primary"
            className={styles.btn}
            component="label"
          >
            <b style={{ fontSize: "large" }}>Insert Photo</b>
            <input type="file" hidden />
          </Button> */}

          <Button
            variant="contained"
            style={{ background: "black" }}
            color="primary"
            className={styles.btn}
            onClick={handleSubmit}
          >
            <b style={{ fontSize: "large" }}>Next</b>
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export { NewTagForm };
