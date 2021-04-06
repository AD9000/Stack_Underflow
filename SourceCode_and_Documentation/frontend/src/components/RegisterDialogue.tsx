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
    closeBtn: {
        position: 'absolute',
        color: '#3481e1',
        top: '0px',
        left: '390px'
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const styles = useStyles();

  return (
    <div>
      <Button variant="contained" color="primary" className={styles.btn} onClick={handleClickOpen}>
        <b>Register</b>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={styles.blur} maxWidth="sm" BackdropProps={{style:{backgroundColor:'transparent'}}}>
        <div className={styles.dialog}>
            <DialogTitle id="form-dialog-title">
                <Typography className={styles.dialogTitle}>
                    <b>Register New Account</b>
                </Typography>
                <IconButton aria-label="close" className={styles.closeBtn} onClick={handleClose}>
                    <CloseIcon />
             </IconButton>
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
                        id="email"
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
                        id="email"
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
                <Button variant="contained" color="primary" className={styles.btn} /* onClick={handleClickOpen} */>
                    <b style={{fontSize:'large'}}>Next</b>
                </Button>
                
                
                {/* <Button onClick={handleClose} color="primary">
                Subscribe
                </Button> */}
            </DialogActions>
        </div>
        
      </Dialog>
    </div>
  );
}
