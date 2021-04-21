import React from "react";
import { DashboardNav } from "../components/Navbar/DashboardNav";
import { Container, makeStyles, Switch, Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles({
  backgroundDark: {
    backgroundColor: '#051c3f',
    height: '100%',
    color: 'white',
  },
  backgroundLight: {
    backgroundColor: 'white',
    height: '100%',
    color: 'black',
  },
  page: {
    padding: '7rem 0',
  },
  side: {
    display: 'flex'
  },
  select: {
    backgroundColor: 'white'
  }
})

const Settings = () => {
  const classes = useStyles();
  const [mode, setMode] = React.useState(false)
  const [modeTitle, setModeTitle] = React.useState('Dark')
  const [bg, setBg] = React.useState(classes.backgroundDark);
  const [language, setLanguage] = React.useState('English');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(!mode);
    console.log(mode);
    if (mode) {
      setModeTitle('Dark');
      setBg(classes.backgroundDark);
    }
    else {
      setModeTitle('Light');
      setBg(classes.backgroundLight);
    };
    
  }
  return (
    <div className={bg}>
      <DashboardNav />
      <Container className={classes.page}>
      <h1>Account Settings</h1>
      <div>
          <h3>Light / Dark Mode</h3>
          <div className={classes.side}>
            <Switch
                checked={mode}
                onChange={handleChange}
                name="mode"
                color="primary"
              />
              <p>{modeTitle}</p>
          </div>
       
        <div className={classes.side}>
          <h3>Language:</h3>
          <Select
            labelId="Language"
            id="languageSelect"
            value={language}
            className={classes.select}
          >
            <MenuItem value={10}>English</MenuItem>
            <MenuItem value={20}>French</MenuItem>
            <MenuItem value={30}>German</MenuItem>
          </Select>
        </div>
      </div>
      </Container>
    </div>
    
  );
}

export { Settings };