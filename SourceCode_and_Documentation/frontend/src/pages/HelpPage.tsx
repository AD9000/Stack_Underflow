import React from "react";
import { HomeNav } from "../components/Navbar/HomeNav";
import { DashboardNav } from "../components/Navbar/DashboardNav";
import { makeStyles } from "@material-ui/styles";
import { useLocation } from "react-router-dom";
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
  background: {
    height: "100%",
    backgroundColor: "#051c3f"
  },
  page: {
    padding: '7rem 0',
    color: 'white'
  },
});

const HelpPage = () => {
  const classes = useStyles();
  const location = useLocation();

  function newHelp(title:string, body:string) {
    return (
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
        <br/>
      </div>
    );
  }

  return (
    <div className={classes.background}>
      { location.state==="home" ? <HomeNav /> : <DashboardNav /> }
      <Container maxWidth="md" className={classes.page}>
        <h1>Help</h1>
        {newHelp('How do I create a Tag?', "First click on the 'Create A Tag' button, click on the location you want your pin to be placed, fill in the form and publish your tag!")}
        {newHelp('How do I view a Tag?', "Simply click on the tag that you want to view in the side menu.")}
        {newHelp('How do I show or hide the side menu?', "There is a small arrow on the righthand side of your browser. Click that button to toggle the side menu.")}
        {newHelp('How do I change my username or password?',"Navigate to 'My Profile' in your Profile settings.")}
        {newHelp('How do I change my language or switch to light/dark mode?', "Navigate to 'Account Settings' and change your settings there.")}
      </Container>
    </div>
  );
}

export { HelpPage };