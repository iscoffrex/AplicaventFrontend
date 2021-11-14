import imagen from "../assets/logo-empresa.png";
import "./Header.css";
import { ImageHeader } from "./ImageHeader";
import { UsuarioHeader } from "./usuarioHeader";

const Header = ({ children, user, auth }) => {
    return (
        <header className="container-header">
            <img
                className="header-a-imagen-brand"
                src={imagen}
                alt="Logo Empresa"
            />
            {children}
            <div className="container-header-userInfo">
                <UsuarioHeader user={user} />
                <ImageHeader user={user} />
                <div id="header_right_content">
                    <button className="btn-CerrarSesion" onClick={auth.logout}>
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
