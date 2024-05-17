import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import SignUp from './SignUp';
import Login from './LoginPage/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
