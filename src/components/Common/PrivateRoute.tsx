import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

// interface PrivateRouteProps {}

export function PrivateRoute(props: RouteProps) {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (!isLoggedIn) return <Redirect to="/login" />;
  return <Route {...props} />;
}
