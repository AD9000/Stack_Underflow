import React, { useEffect, useState } from "react";
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
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import SpotifyLogin from "./Spotify-Api/SpotifyLogin";
import { api } from "../Helpers/api";

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
    /* 
    position: 'absolute',
    color: '#3481e1',
    top: '0px',
    left: '390px' */
    color: "#3481e1",
    float: "right",
  },
  alert: {
    backgroundColor: "white",
    margin: "10px",
    color: "#1aad72",
  },
}));

/* const UIstyles = theme => ({
    multilineColor:{
        color:'red'
    }
}); */

// Change name
export default function RegisterDialog() {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(1);
  // const [success, setSuccess] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

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
        console.log(success);
        if (success) {
          setStep(step + 1);
        }
      });
    } else {
      setStep(step + 1);
    }
  };

  const submitForm = async () => {
    console.log(username, email, password, passwordConfirm);
    if (
      username.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      passwordConfirm.length === 0 ||
      password !== passwordConfirm
    ) {
      console.log("Incorrect Input");
      return false;
    }
    const body = JSON.stringify({
      username: username,
      email: email,
      password: password,
    });
    console.log(body);
    const response = await fetch(`${api}registerUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    if (response.status === 200) {
      console.log("Registered user");
      return true;
    } else {
      const data = await response.json();
      console.log(data);
    }
  };

  const styles = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={styles.btn}
        onClick={handleClickOpen}
      >
        <b>Register</b>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={styles.blur}
        maxWidth="sm"
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
      >
        {step === 1 ? (
          <div className={styles.dialog}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              className={styles.closeBtn}
            >
              <CloseIcon />
            </IconButton>
            <DialogTitle id="form-dialog-title">
              <Typography className={styles.dialogTitle}>
                <b>Register New Account</b>
              </Typography>
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
              <div className={styles.grid}>
                <h3 style={{ marginRight: "1rem" }} className={styles.text}>
                  Username
                </h3>
                <TextField
                  // autoFocus
                  variant="outlined"
                  margin="dense"
                  id="username"
                  InputProps={{ className: styles.input }}
                  // placeholder="username"
                  onBlur={(e) => setUsername(e.target.value)}
                />
                <h3 style={{ marginRight: "1rem" }} className={styles.text}>
                  Email
                </h3>
                <TextField
                  // autoFocus
                  variant="outlined"
                  margin="dense"
                  id="email"
                  InputProps={{ className: styles.input }}
                  // placeholder="email"
                  onBlur={(e) => setEmail(e.target.value)}
                />
                <h3 style={{ marginRight: "1rem" }} className={styles.text}>
                  Password
                </h3>
                <TextField
                  // autoFocus
                  variant="outlined"
                  margin="dense"
                  id="password"
                  InputProps={{ className: styles.input }}
                  // placeholder={password}
                  onBlur={(e) => setPassword(e.target.value)}
                  type="password"
                />
                <h3 style={{ marginRight: "1rem" }} className={styles.text}>
                  Confirm Password
                </h3>
                <TextField
                  // autoFocus
                  variant="outlined"
                  margin="dense"
                  id="confirmPassword"
                  InputProps={{ className: styles.input }}
                  // placeholder="confirm password"
                  onBlur={(e) => setPasswordConfirm(e.target.value)}
                  type="password"
                />
              </div>
              <p className={styles.text} style={{ textAlign: "center" }}>
                Already have an account?{" "}
                <a href="http://localhost:3000" style={{ color: "#3481e1" }}>
                  Sign In
                </a>
              </p>
            </DialogContent>
            <DialogActions>
              <p className={styles.text}>
                <a href="http://localhost:3000" style={{ color: "#3481e1" }}>
                  Help
                </a>
              </p>
              <Button
                variant="contained"
                color="primary"
                className={styles.btn}
                onClick={handleNext}
              >
                <b style={{ fontSize: "large" }}>Next</b>
              </Button>
            </DialogActions>
          </div>
        ) : (
          <div className={styles.dialog}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              className={styles.closeBtn}
            >
              <CloseIcon />
            </IconButton>
            <DialogTitle id="form-dialog-title">
              <Typography className={styles.dialogTitle}>
                <b>Link Your Spotify Account</b>
              </Typography>
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
              <Button
                variant="contained"
                color="primary"
                className={styles.btn}
              >
                <SpotifyLogin />
              </Button>
            </DialogContent>
            <DialogActions>
              <p className={styles.text}>
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
}
