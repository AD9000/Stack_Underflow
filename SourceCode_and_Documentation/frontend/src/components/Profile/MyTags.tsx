import React from "react";
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  page: {
    color: 'white',
    padding: '5rem 0',
  }
})

const MyTags = () => {
  const classes = useStyles();
  console.log('my tags')

  return (
    <Container maxWidth="lg" className={classes.page}>
      <h1>My Tags</h1>
      <div>
        Tags you have posted.
      </div>
    </Container>
  );
}

export { MyTags };