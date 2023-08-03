import React from 'react';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
