import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";

export default function PrivateRoute({ component: Component, ...rest }) {
    const auth = useAuth();
    return (
        <Route {...rest}>
            {auth.isLogged() ? <Component /> : <Redirect to="/" />}
        </Route>
    );
}