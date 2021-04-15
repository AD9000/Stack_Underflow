import React from "react";
import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { HomePage } from "./pages/HomePage";
import { RegisterSuccess } from "./pages/RegisterSuccess";
import { HelpPage } from "./pages/HelpPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Dashboard} />
        <Route path="/register/success" component={RegisterSuccess} />
        <Route path="/help" component={HelpPage} />
        <Route path="*" component={HomePage} />        
      </Switch>
    </Router>
  );
};

// const App = () => {
//   return (
//     <div style={{ height: "100%" }}>
//       <MapWrapper />
//     </div>
//   );
// };

export default App;
