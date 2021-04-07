import React from "react";
import { AppBar, Toolbar, Button, Theme, makeStyles, Menu, MenuItem } from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import { StylesContext } from "@material-ui/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: "#000006",
    fontFamily: "farro",
    justifyContent: "space-between",
    padding: theme.spacing(0.5),
  },
  playButton: {
    marginRight: theme.spacing(2),
    fontSize: "2.6rem",
    marginTop: theme.spacing(-0.6),
  },
  title: {
    marginRight: theme.spacing(2),
  },
  text: {
    color: 'white',
    margin: theme.spacing(2),
  },
  btn: {
    color: 'white',
    fontFamily: 'farro'
  }, 
}))

const UserNavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [settingsAnchor, setSettingsAnchor] = React.useState<null | HTMLElement>(null);
  
  const handleClickUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSettingsAnchor(null);
  };

  const styles = useStyles();
  let username = "username";

  return (
    <AppBar position="fixed" className={styles.appBar}>
      <Toolbar>
        <PlayCircleOutlineIcon fontSize="large" className={styles.playButton} />
        <h1 className={styles.title}>WorldPlay</h1>
        <Link to='home'>
          <h4 className={styles.text}>About</h4>
        </Link>
        <Link to='home'>
          <h4 className={styles.text}>Help</h4>
        </Link>
       
        <div style={{ flex: 1 }}></div>
        <AccountCircleIcon fontSize="large"/>
        <Button className={styles.btn} onClick={handleClickUser}>
          {username}
          <ArrowDropDownIcon/>
        </Button>
        <Menu
          id="userMenu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <PersonIcon/>
            My Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <PriorityHighIcon/>
            Notifications
          </MenuItem>
        </Menu>
        <Button onClick={handleClickSettings} style={{color:'white'}}>
          <SettingsIcon fontSize="large"/>
        </Button>
        
        <Menu
          id="settingsMenu"
          anchorEl={settingsAnchor}
          keepMounted
          open={Boolean(settingsAnchor)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <SettingsIcon/>
            Profile Settings
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ExitToAppIcon/>
            Log Out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export {UserNavBar};