import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";
import Header from "./Header";
import Main from "./Main";



const Rutas = ({ auth }) => (
    <nav>
        <div className="nav-items">
            <Link to="/inicio" className="nav-item">
                Inicio
            </Link>
            <Link to="/ventas" className="nav-item">
                Ventas
            </Link>
            {auth.isLogged() && auth.user.rol === "Administrador" && (
                <Link to="/productos" className="nav-item">
                    Productos
                </Link>
            )}
            {auth.isLogged() && auth.user.rol === "Administrador" && (
                <Link to="/usuarios" className="nav-item">
                    Usuarios
                </Link>
            )}
        </div>
    </nav>
);

const Navigation = () => {
    const auth = useAuth();
    return (
        <>
            <Router>
                <Header user={auth.user} auth={auth}>
                    <Rutas auth={auth} />
                </Header>
                <Switch>
                    <Route path="/ventas">
                        <Main component={1} />
                    </Route>
                    <Route path="/productos">
                        <Main component={2} />
                    </Route>
                    <Route path="/usuarios">
                        <Main component={3} />
                    </Route>
                    <Route path="/inicio">
                        <Main component={4} />
                    </Route>
                </Switch>
            </Router>
        </>
    );
};

export default Navigation;
