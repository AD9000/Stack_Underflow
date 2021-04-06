import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
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
    dialogText: {
        color: 'white',
        fontFamily: 'farro',
        fontSize: 'x-large',
        textAlign: 'center'
    },
    input: {
        color: 'white'
    }
});



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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <div className={styles.dialog}>
            <DialogTitle id="form-dialog-title">
                <Typography className={styles.dialogText}>
                    <b>Register</b>
                </Typography>
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    variant="outlined"
                    margin="dense"
                    id="name"
                    label={<Typography className={styles.input}>Username</Typography>}
                    type="email"
                    fullWidth
                    
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                Subscribe
                </Button>
            </DialogActions>
        </div>
        
      </Dialog>
    </div>
  );
}
