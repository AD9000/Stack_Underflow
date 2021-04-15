import React from "react";
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  page: {
    color: 'white',
    padding: '5rem 5rem'
  }
})

const MyProfile = () => {
  const classes = useStyles();
  console.log('my profile');


  return (
    <Container maxWidth="lg" className={classes.page}>
      <h1>My Profile</h1>
      <div>

      </div>
    </Container>
  );
}

export { MyProfile };