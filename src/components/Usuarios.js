/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import useAuth from "../hooks/auth/useAuth";
import ListaUsuarios from "./ListaUsuarios";
import {
    getUsuariosService,
    getRolesService,
    getEstadosService,
    putUsuarioService,
} from "../services/Usuarios.service";
import "./Usuarios.css";

const Usuarios = () => {
    const auth = useAuth();
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [estados, setEstados] = useState([]);
    const [cargandoUsuarios, setCargandoUsuarios] = useState(true);
    const [cargandoRoles, setCargandoRoles] = useState(true);
    const [cargandoEstados, setCargandoEstados] = useState(true);

    const getData = () => {
        getUsuariosService(auth)
            .then((usuarios) => {
                setUsuarios(usuarios);
                setCargandoUsuarios(false);
            })
            .catch((error) => {
                console.log(error);
            });

        getRolesService(auth)
            .then((roles) => {
                setRoles(roles);
                setCargandoRoles(false);
            })
            .catch((error) => {
                console.log(error);
            });

        getEstadosService(auth)
            .then((estados) => {
                setEstados(estados);
                setCargandoEstados(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleActualizar = (usuario) => {
        putUsuarioService(auth, usuario)
            .then(() => {
                getData();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const lista = (
        <table className="table-usuarios">
            <thead className="table-head-usuarios">
                <tr className="table-head-tr-usuarios">
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="table-body-usuarios">
                {usuarios.map((usuario) => (
                    <ListaUsuarios
                        key={usuario._id}
                        usuario={usuario}
                        roles={roles}
                        estados={estados}
                        handleActualizar={(e) => handleActualizar(e)}
                    />
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="container-usuarios">
            <div className="container-usuarios-titulo">
                <h2>Modulo Usuarios</h2>
            </div>
            <div className="container-table-usuarios">
                {cargandoUsuarios || cargandoRoles || cargandoEstados
                    ? null
                    : lista}
            </div>
        </div>
    );
};

export default Usuarios;
