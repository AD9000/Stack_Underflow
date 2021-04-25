import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { Typography, Theme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "@fontsource/farro";
import { SpotifyLogin } from "./Spotify-Api/SpotifyLogin";
import { apiRegister, apiLogin } from "../helpers/api";
import { storeToken } from "helpers/token";

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
    color: "#3481e1",
    float: "right",
  },
}));

/**
 * Renders the form that the user can use to register an account
 * with WorldPlay
 * @returns {JSX.Element}
 */
const RegisterDialog = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStep(1);
  };

  const handleNext = () => {
    if (step === 1) {
      submitForm().then((success) => {
        if (success) {
          setStep(step + 1);
        }
      });
    } else {
      setStep(step + 1);
    }
  };

  const checkForm = () => {
    return (
      username.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      passwordConfirm.length === 0 ||
      password !== passwordConfirm
    );
  };

  const submitForm = async () => {
    if (!checkForm) {
      alert("Incorrect Input. Please check your entry");
    }

    const response = await apiRegister({ username, password, email });

    if (response.status === 200) {
      // then also log the user in (temp?)
      apiLogin({ username, password });

      // add username into localstorage
      storeToken("username", username);
      return true;
    }
  };

  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.btn}
        onClick={handleClickOpen}
      >
        <b>Register</b>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.blur}
        maxWidth="sm"
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
      >
        {step === 1 ? (
          <div className={classes.dialog}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              className={classes.closeBtn}
            >
              <CloseIcon />
            </IconButton>
            <DialogTitle id="form-dialog-title">
              <Typography className={classes.dialogTitle}>
                <b>Register New Account</b>
              </Typography>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <div className={classes.grid}>
                <h3 style={{ marginRight: "1rem" }} className={classes.text}>
                  Username
                </h3>
                <TextField
                  // autoFocus
                  variant="outlined"
                  margin="dense"
                  id="username"
                  InputProps={{ className: classes.input }}
                  // placeholder="username"
                  onBlur={(e) => setUsername(e.target.value)}
                />
                <h3 style={{ marginRight: "1rem" }} className={classes.text}>
                  Email
                </h3>
                <TextField
                  // autoFocus
                  variant="outlined"
                  margin="dense"
                  id="email"
                  InputProps={{ className: classes.input }}
                  // placeholder="email"
                  onBlur={(e) => setEmail(e.target.value)}
                />
                <h3 style={{ marginRight: "1rem" }} className={classes.text}>
                  Password
                </h3>
                <TextField
                  // autoFocus
                  variant="outlined"
                  margin="dense"
                  id="password"
                  InputProps={{ className: classes.input }}
                  // placeholder={password}
                  onBlur={(e) => setPassword(e.target.value)}
                  type="password"
                />
                <h3 style={{ marginRight: "1rem" }} className={classes.text}>
                  Confirm Password
                </h3>
                <TextField
                  // autoFocus
                  variant="outlined"
                  margin="dense"
                  id="confirmPassword"
                  InputProps={{ className: classes.input }}
                  // placeholder="confirm password"
                  onBlur={(e) => setPasswordConfirm(e.target.value)}
                  type="password"
                />
              </div>
              <p className={classes.text} style={{ textAlign: "center" }}>
                Already have an account?{" "}
                <a href="http://localhost:3000" style={{ color: "#3481e1" }}>
                  Sign In
                </a>
              </p>
            </DialogContent>
            <DialogActions>
              <p className={classes.text}>
                <a href="http://localhost:3000" style={{ color: "#3481e1" }}>
                  Help
                </a>
              </p>
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={handleNext}
              >
                <b style={{ fontSize: "large" }}>Next</b>
              </Button>
            </DialogActions>
          </div>
        ) : (
          <div className={classes.dialog}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              className={classes.closeBtn}
            >
              <CloseIcon />
            </IconButton>
            <DialogTitle id="form-dialog-title">
              <Typography className={classes.dialogTitle}>
                <b>Link Your Spotify Account</b>
              </Typography>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
              >
                <SpotifyLogin />
              </Button>
            </DialogContent>
            <DialogActions>
              <p className={classes.text}>
                <a href="http://localhost:3000" style={{ color: "#3481e1" }}>
                  Help
                </a>
              </p>
            </DialogActions>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export { RegisterDialog };
