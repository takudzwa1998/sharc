import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
*Protected route for login component, enhances security
*@param {children} children - components
*/
const ProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("token") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/Admin_Login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
export default ProtectedRoute;
