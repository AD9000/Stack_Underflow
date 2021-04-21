import React from "react";
import { Container, makeStyles } from '@material-ui/core';
import { getToken } from '../../Helpers/token';
import { api } from '../../Helpers/api';

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
  const username = getToken('username') || 'user';
  const [password, setPassword] = React.useState('');

  const [editingUser, setEditingUser] = React.useState(true);
  const [editingPass, setEditingPass] = React.useState(true);

  const [linkTextUser, setlinkTextUser] = React.useState('Change Username');
  const [linkTextPass, setlinkTextPass] = React.useState('Change Password');

  const [newUser, setNewUser] = React.useState('');
  const [newPass, setNewPass] = React.useState('');

  const fetchProfile = async () => {
    const result = await fetch(`${api}myProfile/${username}`, {
      method: "GET"
    });
    if (result.status === 200) {
      const r = await result.json();
      console.log('success', r);
      setPassword(r.password);
    }
  }
  fetchProfile();

  /* const changePassword = async () => {
    const result = await fetch(`${api}changePassword/${username}?${newPass}`, {
      method: "PUT",
    }
  } */

  const handleEnableUser = () => {
    console.log('handleEnableUser')
    setEditingUser(!editingUser);
    if (editingUser) setlinkTextUser('Save changes');
    else setlinkTextUser('Change Username');
  }
  const handleEnablePass = () => {
    console.log('handleEnablePass')
    setEditingPass(!editingPass);
    if (editingPass) setlinkTextPass('Save changes');
    else setlinkTextPass('Change Password');
  }

  return (
    <Container maxWidth="lg" className={classes.page}>
      <h1>My Profile</h1>
      <div>
        <h3>Email: sample@email.com</h3>
        <br/>
        <div>
          <h3>Username</h3>
          <input value={username} disabled={editingUser} className={classes.input}/>
          <a onClick={handleEnableUser} className={classes.link} >
            <u>{linkTextUser}</u>
          </a>
        </div>
        <br/>
        <div>
          <h3>Password</h3>
          <input value={password} type="password" disabled={editingPass}/>
          <a onClick={handleEnablePass} className={classes.link}>
            <u>{linkTextPass}</u>
          </a>
        </div>
      </div>
    </Container>
  );
}

export { MyProfile };