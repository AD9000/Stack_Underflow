import React, { useState } from "react";
import { Button, Container, makeStyles } from "@material-ui/core";
import { getToken } from "helpers/token";

const useStyles = makeStyles({
  page: {
    color: "white",
    padding: "5rem 0",
  },
  tf: {
    color: "white",
  },
  link: {
    color: "white",
    margin: "2rem",
  },
  input: {
    fontSize: "large",
  },
});

/**
 * Shows the current username to an authenticated user
 * and allows them to change their username and password
 * @returns JSX.Element: The "My Profile Page" contents
 */
const MyProfile = () => {
  const classes = useStyles();
  const username = getToken("username") || "user";
  const [password, setPassword] = useState("");

  const [editingUser, setEditingUser] = useState(true);
  const [editingPass, setEditingPass] = useState(true);

  const [linkTextUser, setlinkTextUser] = useState("Change Username");
  const [linkTextPass, setlinkTextPass] = useState("Change Password");

  // const changePassword = async () => {
  //   const result = await fetch(`${api}changePassword/${username}?${newPass}`, {
  //     method: "PUT",
  //   }
  // }

  const handleEnableUser = () => {
    setEditingUser(!editingUser);
    if (editingUser) setlinkTextUser("Save changes");
    else setlinkTextUser("Change Username");
  };
  const handleEnablePass = () => {
    setEditingPass(!editingPass);
    if (editingPass) setlinkTextPass("Save changes");
    else setlinkTextPass("Change Password");
  };

  return (
    <Container maxWidth="lg" className={classes.page}>
      <h1>My Profile</h1>
      <div>
        <h3>Email: sample@email.com</h3>
        <br />
        <div>
          <h3>Username</h3>
          <input
            value={username}
            disabled={editingUser}
            className={classes.input}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEnableUser}
            className={classes.link}
          >
            <u>{linkTextUser}</u>
          </Button>
        </div>
        <br />
        <div>
          <h3>Password</h3>
          <input
            value={password}
            type="password"
            disabled={editingPass}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEnablePass}
            className={classes.link}
          >
            <u>{linkTextPass}</u>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export { MyProfile };
