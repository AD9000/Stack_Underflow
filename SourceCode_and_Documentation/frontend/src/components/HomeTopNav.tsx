import React from "react";
import { AppBar, Toolbar, Button, Theme, makeStyles, Popover, Card, CardHeader, CardContent } from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import LoginButton from "./LoginButton";
import CloseIcon from '@material-ui/icons/Close';
import reefPic from '../assets/reef.jpeg';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: "#000006",
    fontFamily: "farro",
    justifyContent: "space-between",
    padding: theme.spacing(0.5),
    maxHeight: "8%",
  },
  toolBar: {
    display: "flex",
    flex: 1,
  },
  grow: {
    display: "flex",
    flex: 1,
  },
  whiteText: {
    color: "white",
  },
  buttonText: {
    textTransform: "none",
    fontFamily: "farro",
    margin: "0.5rem",
  },
  title: {
    marginRight: theme.spacing(2),
    fontFamily: "farro",
  },
  playButton: {
    marginRight: theme.spacing(2),
    fontSize: "2.6rem",
    marginTop: theme.spacing(-0.6),
  },
  settings: {
    padding: theme.spacing(1),
    fontSize: "2.6rem",
  },
  popover: {
    height: '30rem',
    width: '30rem',
    backgroundColor: '#405b99',

  },
  popoverContent: {
    backgroundColor: '#0f214a',
    width:'25rem',
    height: '21rem',
    margin: 'auto',
    color:'white'
  },
  tagTitle: {
    fontSize: 'xx-large',
    color: 'white',
    textAlign: 'center',
    margin: '1rem 0 0 0 '
  },
  closeBtn: {
    color: '#0f214a',
    float: 'right'
  },
  pic: {
    height: '11rem'
  },
  media: {
    display: 'flex',
  }
}));

const HomeTopNav = ({ signin }: { signin?: boolean }) => {
  const styles = useStyles();
  const [randomTag, setRandomTag] = React.useState<HTMLButtonElement | null>(null);

  const handleRandomClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRandomTag(event.currentTarget);
  };

  const handleRandomClose = () => {
    setRandomTag(null);
  }

  const randomOpen = Boolean(randomTag);


  return (
    <AppBar position="fixed" className={styles.appBar}>
      <Toolbar className={styles.toolBar}>
        <PlayCircleOutlineIcon fontSize="large" className={styles.playButton} />
        <h1 className={styles.title}>DISCOVER. PLAY.</h1>
        <Button
          variant="contained"
          color="primary"
          className={styles.buttonText}
          onClick={handleRandomClick}
        >
          <b>Generate Random Tag</b>
        </Button>
        <Popover
          id='randomTagPopover'
          open={randomOpen}
          anchorEl={randomTag}
          onClose={handleRandomClose}
          anchorOrigin={{
            vertical:'bottom',
            horizontal:'center',
          }}
          transformOrigin={{
            vertical:'top',
            horizontal:'center'
          }}
        >
          <Card className={styles.popover}>
            <CardContent>
              <CloseIcon onClick={handleRandomClose} className={styles.closeBtn}/>
              <h3 className={styles.tagTitle}>Australia</h3>
            </CardContent>
            <CardContent className={styles.popoverContent}>
              <p style={{margin:'0 0 0.2rem 0', textShadow: '2px 2px 8px black'}}>Anonymous</p>
              <div >
                <div className={styles.media} >
                  <img src={reefPic} className={styles.pic} />
                  <div style={{margin: '0 1rem', display:'flex', flexDirection:'column'}}>
                    <h2 style={{margin:'0.2rem 0'}}>Beautiful Experience!</h2>
                      <p style={{margin:'0'}}>Queensland</p>
                      <div style={{flex:1}}/>
                      <h4 style={{margin:'0'}}><i>"Water"</i></h4>
                      <h4 style={{margin:'0'}}>Kanye West</h4>
                  </div>
                </div>
                  <p>Being underwater is such a surreal experience, one that I can't compare to anything else! 
                  <br/><br/>
                  My favourite lyric in this song is "Clean us like the rain in spring... Let Your light reflect on me"
                  <br/><br/>
                  Can't wait until I see the ocean again!!!
                  </p>
              </div>
            </CardContent>
          </Card>

        </Popover>
        <div style={{ flex: 1 }}></div>
        {signin ? null : <LoginButton />}
        <a href="#" className={styles.whiteText}>
          <SettingsIcon fontSize="large" className={styles.settings} />
        </a>
      </Toolbar>
    </AppBar>
  );
};

HomeTopNav.defaultProps = {
  signin: false,
};

export { HomeTopNav };
