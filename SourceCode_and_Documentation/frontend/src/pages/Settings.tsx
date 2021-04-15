import React from "react";
import { DashboardNav } from "../components/Navbar/DashboardNav";
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  page: {
    backgroundColor: '#051c3f',
    height: '100%',
    color: 'white',
  }
})

const Settings = () => {
  const classes = useStyles();
  console.log('account settings');


  return (
    <Container maxWidth="lg" className={classes.page}>
      <DashboardNav />
      <h1>Account Settings</h1>
      <div>

      </div>
    </Container>
  );
}

export { Settings };