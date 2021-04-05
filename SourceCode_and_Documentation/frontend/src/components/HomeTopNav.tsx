import React from "react";
import { Container, AppBar, Toolbar, Button} from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SettingsIcon from '@material-ui/icons/Settings'; 
import { makeStyles } from '@material-ui/styles';

// POSITIONS ARE HARDCODED TODO
const useStyles = makeStyles({
    appBar: {
        height: '100%',
        width: '100%',
        backgroundColor: '#000006',
        fontFamily: "farro",
    },
    whiteText: {
        color: 'white'
    },
    buttonText: {
        textTransform: 'none',
        fontFamily: "farro",
        margin: '0.5rem'
    }

});


const HomeTopNav = () => {
    const styles = useStyles();
    return (
        <AppBar position="static" className={styles.appBar}>
                <Toolbar variant="dense">
                    <PlayCircleOutlineIcon fontSize="large"/>
                    <h1>DISCOVER. PLAY.</h1>
                    <Button variant="contained" color="primary" className={styles.buttonText}><b>Generate Random Tag</b></Button>
                    <Button variant="contained" color="primary" className={styles.buttonText} style={{margin:'0 0 0 30rem'}}><b>Sign In</b></Button>
                    <a href='#' className={styles.whiteText}><SettingsIcon fontSize="large" style={{margin:'0 0 0 0 1rem'}}/></a>
                </Toolbar>
        </AppBar>
    );
}

export { HomeTopNav };