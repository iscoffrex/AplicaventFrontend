import Ventas from "./Ventas";
import Productos from "./Productos";
import Usuarios from "./Usuarios";
import Inicio from "./Inicio";
import "./Main.css"

const Main = ({component}) => {
    switch (component) {
        case 1:
            return (
                <div id="main_section">
                    <Ventas />
                </div>
            );
        case 2:
            return (
                <div id="main_section">
                    <Productos />
                </div>
            );
        case 3:
            return (
                <div id="main_section">
                    <Usuarios />
                </div>
            );
        case 4:
            return (
                <div id="main_section">
                    <Inicio />
                </div>
            );
        default:
            return <></>;
    }
}

export default Main
