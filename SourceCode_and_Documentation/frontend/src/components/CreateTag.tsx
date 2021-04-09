import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "@fontsource/farro";

const useStyles = makeStyles({
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
});

const CreateTag = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={styles.buttonText}
        onClick={handleClickOpen}
      >
        <b>Create A Tag</b>
      </Button>
      <Dialog
        open={open}
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
              <h3 className={styles.text}>Location</h3>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="location"
                InputProps={{ className: styles.input }}
                placeholder="location"
                /* label={<Typography style={{fontFamily:'farro'}}>Username</Typography>}*/
              />
              <h3 className={styles.text}>Song</h3>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="song"
                InputProps={{ className: styles.input }}
                placeholder="Enter spotify url"
              />
              <h3 className={styles.text}>Title</h3>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="title"
                InputProps={{ className: styles.input }}
                placeholder="Enter Tag Title"
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
              />
            </div>
          </DialogContent>
          <DialogActions
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              variant="contained"
              style={{ background: "black" }}
              color="primary"
              className={styles.btn}
            >
              <b style={{ fontSize: "large" }}>Insert Photo</b>
            </Button>
            <Button
              variant="contained"
              style={{ background: "black" }}
              color="primary"
              className={styles.btn}
            >
              <b style={{ fontSize: "large" }}>Next</b>
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export { CreateTag };
