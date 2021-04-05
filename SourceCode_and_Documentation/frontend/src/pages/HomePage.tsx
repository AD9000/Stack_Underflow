import React from "react";
import { Container, Typography, Button } from '@material-ui/core';
import "@fontsource/farro";
import { HomeTopNav } from '../components/HomeTopNav';
import globe from '../assets/globe.png';
import { makeStyles } from '@material-ui/styles';
//import { MenuIcon } from '@material-ui/core/MenuIcon';

const useStyles = makeStyles({
    background: {
        backgroundImage: `url(${globe})`,
        height: '100%',
        width: '100%'
    },
    whiteText: {
        color: 'white'
    }
});

export function HomePage() {
    const styles = useStyles();

    return (
        <div className={styles.background}>
            <Container>
                <HomeTopNav/>
                <Button>HEY</Button>
                <Typography className={styles.whiteText}>
                Use your Spotify favourites to connect and share your stories with people all around the world.
                </Typography>
                <Typography className={styles.whiteText}>
                Register now for free!
                </Typography>

                
                {/* <img src="../" */}
            </Container>
        </div>
       
    );
}

