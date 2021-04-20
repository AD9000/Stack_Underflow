import React from "react";
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  page: {
    color: 'white',
    padding: '5rem 0'
  },
  tf: {
    color: 'white'
  },
  link: {
    color: '#3481e1',
    margin: '2rem'
  },
  input: {
    fontSize: 'large'
  }
})

const MyProfile = () => {
  const classes = useStyles();
  console.log('my profile');


  return (
    <Container maxWidth="lg" className={classes.page}>
      <h1>My Profile</h1>
      <div>
        <h3>Email: sample@email.com</h3>
        <br/>
        <div>
          <h3>Username</h3>
          <input value="Username" disabled className={classes.input}/>
          <a href="#" className={classes.link}>Change username</a>
        </div>
        <br/>
        <div>
          <h3>Password</h3>
          <input value="sdasdasd" type="password" disabled/>
          <a href="#" className={classes.link}>Change password</a>
        </div>
      </div>
    </Container>
  );
}

export { MyProfile };