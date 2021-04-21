import React from "react";
import { Container, makeStyles } from '@material-ui/core';
import { api } from '../../Helpers/api';
import { getToken } from '../../Helpers/token';
const useStyles = makeStyles({
  page: {
    color: 'white',
    padding: '5rem 0',
  }
})

const MyTags = () => {
  const classes = useStyles();
  const [userTags, setUserTags] = React.useState('No tags found. Try posting one!');
  const username = getToken('username');

  const fetchTags = async () => {
    const result = await fetch(`${api}myTags/${username}`, {
      method: 'GET',
    });
    console.log(result);
    if (result.status === 200) {
      const r = await result.json();
      console.log(r);
      console.log('success');
      if (r.length) setUserTags(r);
    } else {
      setUserTags('No tags found. Try posting one!');
    }
  }
  fetchTags();


  return (
    <Container maxWidth="lg" className={classes.page}>
      <h1>My Tags</h1>
      <div>
        <p>{userTags}</p>
      </div>
    </Container>
  );
}

export { MyTags };