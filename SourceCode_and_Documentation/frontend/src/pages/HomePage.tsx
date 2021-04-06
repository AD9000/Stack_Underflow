import React from "react";
import { Container, Typography, Button } from '@material-ui/core';
import "@fontsource/farro";
import { HomeTopNav } from '../components/HomeTopNav';
import globe from '../assets/globe.png';
import { makeStyles } from '@material-ui/styles';
import RegisterDialogue from '../components/RegisterDialogue';
//import { MenuIcon } from '@material-ui/core/MenuIcon';

// NOTE SIZES ARE HARDCODED TODO
const useStyles = makeStyles({
    background: {
        backgroundImage: `url(${globe})`,
        height: '100%',
        width: '100%'
    },
    whiteText: {
        color: 'white',
        fontFamily: 'farro',
        fontWeight: 'bold'
    },
    btn: {
        textTransform: 'none',
        fontFamily: "farro",
        fontSize: 'x-large',
        margin: '0.5rem'
    },
    secondaryBtn: {
        textTransform: 'none',
        fontFamily: "farro",
        backgroundColor: '#262626',
        color: 'white',
        fontSize: 'x-large'
    },
    intro: {
        width: '20rem',
        position: 'relative',
        top: '9rem',
        left: '50rem'
    },
    horizontalFlex: {
        display: 'flex',
        flexDirection: 'row'
    }
});

export function HomePage() {
    const styles = useStyles();

    return (
        <div className={styles.background}>
            <Container>
                <HomeTopNav/>
                <div className={styles.intro}>
                    <Typography className={styles.whiteText} style={{fontSize: 'xxx-large'}}>DISCOVER.<br></br> PLAY.</Typography>
                    <Typography className={styles.whiteText}>
                    Use your Spotify favourites to connect and share your stories with people all around the world.
                    </Typography>
                    <Typography className={styles.whiteText} style={{margin: '1rem 0'}}>
                    Register now for free!
                    </Typography>
                    <div className={styles.horizontalFlex}>
                        <RegisterDialogue/>
                        <Button color="primary" className={styles.secondaryBtn}><b>More Info</b></Button>
                    </div>
                    
                </div>
                
                {/* <img src="../" */}
            </Container>
        </div>
       
    );
}

