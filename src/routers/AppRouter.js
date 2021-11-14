import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Root from "../Root";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/inicio" component={Root} />
                <PublicRoute exact path="/" component={Login} />
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </Router>
    );
}