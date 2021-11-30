import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Edit from './pages/Edit';
import History from './pages/History';
import Home from './pages/Home';
import Login from './pages/Login';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/edit/:id">
          <Edit />
        </Route>
        <Route path="/history">
          <History />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}
