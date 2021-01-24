import React from 'react'
import './App.css'

import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";

//importing the pages 
import Landing from './layouts/landing/landing'
import Login from './layouts/login/login'
import Register from './layouts/register/register'
import Lobby from './layouts/lobby/lobby'
import Tester from './layouts/deviceTest/tester'

import Exam from './layouts/examZone/exam'

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <Landing/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/ul/:uid/:uname">
          <Lobby/>
        </Route>
        <Route path="/test">
          <Tester/>
        </Route>
        <Route path="/exam">
          <Exam/>
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
