import React, { useState, MouseEventHandler, useEffect } from "react";
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
import { searchSong } from "../Spotify-Api/spotifyApi";
import CloseIcon from "@material-ui/icons/Close";
import { getToken } from "../../Helpers/token";
import { LatLngTuple } from "leaflet";
import { api } from "../../Helpers/api";

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

const fileToDataUrl = (file: Blob) => {
  const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  const valid = validFileTypes.find((type) => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error("provided file is not a png, jpg or jpeg image.");
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
};

interface DisplayImageProps {
  image: string | null;
  setImage: Function;
}
const DisplayImage = ({ image, setImage }: DisplayImageProps) => {
  const [display, setDisplay] = useState<string | null>(null);
  const styles = useStyles();
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setDisplay(URL.createObjectURL(img));
      setImage(event.target.files[0]);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <h3 className={styles.text}>Image</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "1rem",
          paddingLeft: "3.5rem",
        }}
      >
        {display && <img src={display} style={{ maxHeight: "100px" }} />}
        <input
          className={styles.text}
          type="file"
          name="myImage"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

interface NewTagFormProps {
  createForm: boolean;
  handleClose: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  newMarker: LatLngTuple | null;
}

const NewTagForm = ({
  createForm,
  handleClose,
  newMarker,
}: NewTagFormProps) => {
  const [song, setSong] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const styles = useStyles();

  useEffect(() => {
    console.log("image changed: ", image);
  }, [image]);

  const handleSubmit = async () => {
    const songUri = await searchSong(song);
    const username = getToken("username");

    const tagInfo = {
      title: title,
      region: "",
      location: newMarker?.join(" "),
      caption: caption,
      song_uri: songUri,
    };

    const body = new FormData();
    body.append("tagInf", JSON.stringify(tagInfo));
    if (image) {
      body.append("img", image);
    }

    fetch(`${api}publishTag/${username}`, {
      method: "POST",
      body: body,
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
            {/* <h3 className={styles.text}>Location</h3> */}
            {/* <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              id="location"
              InputProps={{ className: styles.input }}
              placeholder="location"
              onChange={(e) => setLocation(e.target.value)}
            /> */}

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
          <DisplayImage image={image} setImage={setImage} />
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
