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
import { api } from '../Helpers/api';
import { storeToken } from '../Helpers/token';

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
    left: "390px",
  },
});

export default function LoginButton() {
  const styles = useStyles();
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

  const handleSignIn = () => {
    console.log(username, password)
    if (username && password) {
      const body = JSON.stringify({
        username: username,
        password: password
      })
    
      console.log(`${api}login`)
      const result = fetch(`${api}login`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }).then((data) => {
        console.log(data);
        storeToken('username', username)
        history.push('/home');
      })
      .catch((err) => alert(err)) 
    } else {
      alert("Missing field");
    }
  };

  

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={styles.buttonText}
        onClick={handleClickOpen}
      >
        <b>Sign In</b>
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
              <b>Welcome Back</b>
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
              <h3 style={{ marginRight: "1rem" }} className={styles.text}>
                Username
              </h3>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="email"
                InputProps={{ className: styles.input }}
                placeholder="username"
                onBlur={(e) => setUsername(e.target.value)}
                /* label={<Typography style={{fontFamily:'farro'}}>Username</Typography>}*/
                type="text"
              />
              <h3 style={{ marginRight: "1rem" }} className={styles.text}>
                Confirm Password
              </h3>
              <TextField
                variant="outlined"
                margin="dense"
                id="password"
                InputProps={{ className: styles.input }}
                placeholder="password"
                onBlur={(e) => setPassword(e.target.value)}
                /* label={<Typography style={{fontFamily:'farro'}}>Username</Typography>}*/
                type="password"
              />
            </div>
            <p className={styles.text} style={{ textAlign: "right" }}>
              <a href="http://localhost:3000" style={{ color: "#3481e1" }}>
                Forgot Password
              </a>
            </p>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              className={styles.btn}
              onClick={handleSignIn}
            >
              <b style={{ fontSize: "large" }}>Sign In</b>
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
