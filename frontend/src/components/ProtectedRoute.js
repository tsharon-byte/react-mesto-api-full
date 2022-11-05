import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {props.loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/react-mesto-auth/sign-in" />
      )}
    </Route>
  );
};

export default ProtectedRoute;
