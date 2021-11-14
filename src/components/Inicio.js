import useAuth from "../hooks/auth/useAuth";
import "./Inicio.css";
import logoEmpresa from "../assets/logo-empresa.png";

const Inicio = () => {
    const auth = useAuth();
    return (
        <div className="container-inicio">
            <h1>
                Bienvenido
                <br />
                <span>{auth.user.name}</span>
            </h1>
            <img src={logoEmpresa} alt="" />
        </div>
    );
};

export default Inicio;
