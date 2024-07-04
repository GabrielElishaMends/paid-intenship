import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import CompanyPage from './InternshipPage';
import SignUp from './SignUp';
import Login from './LoginPage';
import ApplyForm from './ApplyForm';
import AboutPage from './AboutPage';
import ContactUsPage from './ContactUsPage';
import { AuthProvider } from './internships/AuthContext';
import PrivateRoute from '../src/Internships/PrivateRoute';
import AddCompany from '../src/Internships/AddCompany';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/home" exact component={HomePage} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/internships" exact component={CompanyPage} />
          <PrivateRoute path="/apply" exact component={ApplyForm} />
          <Route path="/contactus" exact component={ContactUsPage} />
          <Route path="/addcompany" component={AddCompany} />
          <Route path="/about" exact component={AboutPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
