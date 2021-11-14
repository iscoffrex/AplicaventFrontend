import GoogleLogin from "react-google-login";
import useAuth from "../hooks/auth/useAuth";
import { loginService } from "../services/Login.service";
import imagenEmpresa from "../assets/logo-empresa.png";

import "./Login.css";

const Login = () => {
    const auth = useAuth();

    const respuestaGoogle = (resp) => {
        loginService(resp, auth);
    };

    return (
        <>
            <div className="container-login">
                <img
                    className="login-imagenEmpresa"
                    src={imagenEmpresa}
                    alt=""
                />
                <h2>Iniciar Sesión</h2>
                <div className="container-buttonLogin">
                        <GoogleLogin
                            clientId="565445927496-o1vusmmnecj23atpgu4r4rnkmrudjmde.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <button
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    className="login-button"
                                >
                                    Autenticación con Google
                                </button>
                            )}
                            buttonText="Login"
                            onSuccess={respuestaGoogle}
                            onFailure={respuestaGoogle}
                            cookiePolicy={"single_host_origin"}
                        />
                </div>
            </div>
        </>
    );
};

export default Login;
