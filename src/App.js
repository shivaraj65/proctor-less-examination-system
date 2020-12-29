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
import Lobby from './layouts/lobby/lobby'

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
        <Route path="/ul/:uid/:uname">
          <Lobby/>
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
