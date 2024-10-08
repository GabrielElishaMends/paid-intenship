// src/Internships/PrivateRoute.tsx
import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useAuth } from './AuthContext';
import LoginFirst from './LoginFirst';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <LoginFirst message=" Log in to access this page." />
        )
      }
    />
  );
};

export default PrivateRoute;
