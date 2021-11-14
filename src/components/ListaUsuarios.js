import { useState } from "react";

const ListaUsuarios = ({ usuario, roles, estados, handleActualizar }) => {
    const [rolUpdate, setRolUpdate] = useState(usuario.rol._id);
    const [estadoUpdate, setEstadoUpdate] = useState(usuario.status._id);

    const users = (
        <tr key={usuario._id} className="table-body-tr-usuarios">
            <td>
                <img src={usuario.picture} alt="" className="table-body-img-usuarios" />
            </td>
            <td>{usuario.name}</td>
            <td>{usuario.email}</td>
            <td>
                <select
                    defaultValue={rolUpdate}
                    onChange={(e) => setRolUpdate(e.target.value)}
                >
                    {roles.map((rol) => (
                        <option key={rol._id} value={rol._id}>
                            {rol.name}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <select
                    defaultValue={estadoUpdate}
                    onChange={(e) => setEstadoUpdate(e.target.value)}
                >
                    {estados.map((estado) => (
                        <option key={estado._id} value={estado._id}>
                            {estado.name}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <button onClick={() => {
                    const usuarioDataUpdate = {
                        id: usuario._id,
                        rol: rolUpdate,
                        status: estadoUpdate
                    }
                    handleActualizar(usuarioDataUpdate);
                }}> Guardar</button>
            </td>
        </tr>
    );

    return <>{users}</>;
};

export default ListaUsuarios;
