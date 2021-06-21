import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import { UserProvider } from "./provider/UserProvider";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
