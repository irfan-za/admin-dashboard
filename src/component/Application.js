import React,{useContext} from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import UserContext from "../provider/UserProvider"
import Home from "./Home"
import Login from "./Login"
import Dashboard from "./Dashboard"
import Register from './Register'

function Application() {
  const user = useContext(UserContext);
  console.log(user)
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
        <Switch>
          <Route path="/register">
            <Register/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default Application
