import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import HomePage from './HomePage';
import SignUp from './SignUp';
import Login from './LoginPage';
import ApplyForm from './ApplyForm';
import AboutPage from './AboutPage';
import ContactUsPage from './ContactUsPage';
import { AuthProvider, useAuth } from './Internships/AuthContext';
import PrivateRoute from './Internships/PrivateRoute';
import AddCompany from './Internships/AddCompany';
import InternshipPage from './InternshipPage';
import EditCompany from './Internships/EditCompany';
import ProfilePage from './ProfilePage';
import NotificationPage from './NotificationPage';

interface RoleBasedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  allowedRoles: string[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ component: Component, allowedRoles, ...rest }) => {
  const { currentUser, userRole } = useAuth();
  
  return (
    <Route
      {...rest}
      render={props =>
        currentUser && userRole && allowedRoles.includes(userRole) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/home" exact component={HomePage} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/internships" exact component={InternshipPage} />
          <PrivateRoute path="/apply" exact component={ApplyForm} />
          <Route path="/contactus" exact component={ContactUsPage} />
          <RoleBasedRoute path="/addcompany" exact component={AddCompany} allowedRoles={['company']} />
          <Route path="/about" exact component={AboutPage} />
          <Route path="/edit-company" component={EditCompany} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/notifications" component={NotificationPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
