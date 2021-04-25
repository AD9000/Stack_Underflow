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
import { useHistory } from "react-router";
import { apiLogin } from "../helpers/api";
import { storeToken } from "../helpers/token";

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
    left: "390px",
  },
});

/**
 * Renders the form that the user uses to log in to their account
 * @returns {JSX.Element}
 */
const LoginForm = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  let history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignIn = async () => {
    if (username && password) {
      const result = await apiLogin({ username, password });
      if (result.status === 200) {
        storeToken("username", username);
        history.push("/home");
      }
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.buttonText}
        onClick={handleClickOpen}
      >
        <b>Sign In</b>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.blur}
        maxWidth="sm"
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
      >
        <div className={classes.dialog}>
          <DialogTitle id="form-dialog-title">
            <Typography className={classes.dialogTitle}>
              <b>Welcome Back</b>
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
              <h3 style={{ marginRight: "1rem" }} className={classes.text}>
                Username
              </h3>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="email"
                InputProps={{ className: classes.input }}
                placeholder="username"
                onBlur={(e) => setUsername(e.target.value)}
                type="text"
              />
              <h3 style={{ marginRight: "1rem" }} className={classes.text}>
                Confirm Password
              </h3>
              <TextField
                variant="outlined"
                margin="dense"
                id="password"
                InputProps={{ className: classes.input }}
                placeholder="password"
                onBlur={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <p className={classes.text} style={{ textAlign: "right" }}>
              <a href="http://localhost:3000" style={{ color: "#3481e1" }}>
                Forgot Password
              </a>
            </p>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={handleSignIn}
            >
              <b style={{ fontSize: "large" }}>Sign In</b>
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export { LoginForm };
