import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { FormControl, Input, InputLabel, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import "@fontsource/farro";
import { render } from '@testing-library/react';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    btn: {
        textTransform: 'none',
        fontFamily: "farro",
        fontSize: 'x-large',
        margin: '0.5rem'
    },
    dialog: {
        backgroundColor: '#0f214a',
        
    },
    dialogTitle: {
        color: 'white',
        fontFamily: 'farro',
        fontSize: 'x-large',
        textAlign: 'center'
    },
    input: {
        fontFamily: 'farro',
        backgroundColor: '#aad0ff'
    },
    blur: {
        backgroundColor: 'rgb(255,255,255,0.3)',
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    horizontalFlex: {
        display: 'flex',
        flexDirection: 'row'
    },
    text: {
        color: 'white'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'auto auto'
    },
    closeBtn: {/* 
        position: 'absolute',
        color: '#3481e1',
        top: '0px',
        left: '390px' */
        color: '#3481e1',
        float: 'right'

    }
});

/* const UIstyles = theme => ({
    multilineColor:{
        color:'red'
    }
}); */

// Change name
export default function RegisterDialog() {
  const [open, setOpen] = React.useState(false);
  //const [linkSpotfy, setLinkSpotify] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [success, setSuccess] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStep(1);
  };

  const handleNext = () => {
    //setLinkSpotify(true);
    setStep(step+1);
  }

  /* const handleBack = () => {
    //setLinkSpotify(false);
    setStep(step-1);
  } */

  const handleSuccess = () => {
    setSuccess(true);
  }



  function Step1() {
    return (
      <div className={styles.dialog}>
        <IconButton aria-label="close" onClick={handleClose} className={styles.closeBtn}>
          <CloseIcon />
        </IconButton>
        <DialogTitle id="form-dialog-title">
          <Typography className={styles.dialogTitle}>
            <b>Register New Account</b>
          </Typography>
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <div className={styles.grid}>
            <h3 style={{marginRight: '1rem'}} className={styles.text}>Username</h3>
            <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="username"
                InputProps={{className: styles.input}}
                placeholder="username"
                /* label={<Typography style={{fontFamily:'farro'}}>Username</Typography>}*/ 
                type="text"
            /> 
            <h3 style={{marginRight: '1rem'}} className={styles.text}>Email</h3>
            <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="email"
                InputProps={{className: styles.input}}
                placeholder="email"
                /* label={<Typography style={{fontFamily:'farro'}}>Username</Typography>}*/ 
                type="email"
            /> 
            <h3 style={{marginRight: '1rem'}} className={styles.text}>Password</h3>
            <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="password"
                InputProps={{className: styles.input}}
                placeholder="password"
                /* label={<Typography style={{fontFamily:'farro'}}>Username</Typography>}*/ 
                type="password"
            /> 
            <h3 style={{marginRight: '1rem'}} className={styles.text}>Confirm Password</h3>
            <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="confirmPassword"
                InputProps={{className: styles.input}}
                placeholder="confirm password"
                /* label={<Typography style={{fontFamily:'farro'}}>Username</Typography>}*/ 
                type="password"
            /> 
          </div>
          <p className={styles.text} style={{textAlign: 'center'}}>Already have an account? <a href='#' style={{color: '#3481e1'}}>Sign In</a></p>
        </DialogContent>
        <DialogActions>
          <p className={styles.text}><a href='#' style={{color: '#3481e1'}}>Help</a></p>
          <Button variant="contained" color="primary" className={styles.btn} onClick={handleNext}>
            <b style={{fontSize:'large'}}>Next</b>
          </Button>
          
          {/* <Button onClick={handleClose} color="primary">
          Subscribe
          </Button> */}
        </DialogActions>
      </div>
    );
  }

  function Step2() {
    return (
      <div className={styles.dialog}>
        <IconButton aria-label="close" onClick={handleClose} className={styles.closeBtn}>
          <CloseIcon />
        </IconButton>
        <DialogTitle id="form-dialog-title">
          <Typography className={styles.dialogTitle}>
            <b>Link Your Spotify Account</b>
          </Typography>
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <h3 className={styles.text} style={{margin:'0'}}>Username</h3>
          <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              id="spotifyUsername"
              InputProps={{className: styles.input}}
              placeholder="username"
              /* label={<Typography style={{fontFamily:'farro'}}>Username</Typography>}*/ 
              type="text"
          /> 
          <h3 className={styles.text} style={{margin:'20px 0 0 0'}}>Password</h3>
          <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              id="spotifyPassword"
              InputProps={{className: styles.input}}
              placeholder="password"
              /* label={<Typography style={{fontFamily:'farro'}}>Username</Typography>}*/ 
              type="password"
          /> 
        </DialogContent>
        <DialogActions>
        <p className={styles.text}><a href='#' style={{color: '#3481e1'}}>Help</a></p>
        <Button variant="contained" color="primary" className={styles.btn} onClick={handleSuccess}>
          <b style={{fontSize:'large'}}>Next</b>
        </Button>
        
        <Alert severity="success">Your account was successfully created!</Alert>
        
        {/* <Button onClick={handleClose} color="primary">
        Subscribe
        </Button> */}
      </DialogActions>
      </div>
    );
  }

  const styles = useStyles();

  let stepDialog;
  if (step == 1) stepDialog = <Step1/>;
  else stepDialog = <Step2/>;


  return (
    <div>
      <Button variant="contained" color="primary" className={styles.btn} onClick={handleClickOpen}>
        <b>Register</b>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={styles.blur} maxWidth="sm" BackdropProps={{style:{backgroundColor:'transparent'}}}>
        {stepDialog}
        
        
      </Dialog>
    </div>
  );
}
