import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
      <Route 
        {...rest} 
        render={({ location }) => auth.user ? 
        (children) 
        : 
        (<Redirect to={{pathname: "/login",state: { from: location }}}/>)}
      />
    );
}