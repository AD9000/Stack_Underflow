import React from "react";
import { Container, AppBar, Toolbar} from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const HomeTopNav = () => {
    return (
        <AppBar position="static" style={{width: '100%', backgroundColor: '#000006', fontFamily: "farro"}}>
            <Toolbar variant="dense">
                <PlayCircleOutlineIcon fontSize="large"/>
                <h1>Discover. Play.</h1>
            </Toolbar>
        </AppBar>
    );
}

export { HomeTopNav };