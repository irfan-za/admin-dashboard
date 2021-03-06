import React,{useContext} from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import UserContext from "../provider/UserProvider"
import Home from "./Home"
import Login from "./Login"
import Dashboard from "./Dashboard"

function Application() {
  const user = useContext(UserContext);
  return (
    user?<Dashboard />:
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
        </Switch>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default Application
