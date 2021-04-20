import React from "react";
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  page: {
    color: 'white',
    padding: '5rem 0'
  }
})

const Notifications = () => {
  const classes = useStyles();
  console.log('notifications');

  return (
    <Container maxWidth="lg" className={classes.page}>
      <h1>My Notifications</h1>
      <div>
        No new notifications.
      </div>
    </Container>
  );
}

export { Notifications };