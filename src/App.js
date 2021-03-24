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

import RegisterationZone from './layouts/registerationZone/registerationZone'
import Exam from './layouts/examZone/exam'
import Zone from './layouts/examZone2/zone'
//imports for the staff modules

import Dash from './layouts/staffdash/dash'
import StaffLogin from './layouts/staffLogin/staffLogin'

import Mailauth from './layouts/mailauth/mailauth'

//feed back form
import Feedback from './layouts/lobby/feedbackform/feedback'

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
        <Route path="/registerationZone/:uid/:uname">
          <RegisterationZone/>
        </Route>
        <Route path="/exam">
          <Exam/>
        </Route>

        <Route path="/sl">
          <StaffLogin/>
        </Route>
        <Route path="/sd/:sid/:sname">
          <Dash/>
        </Route>
        <Route path="/zone/:eid">
          <Zone/>
        </Route>

        <Route path="/feedback">
          <Feedback/>
        </Route>
        <Route path="/mailauth/:id">
          <Mailauth/>
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
