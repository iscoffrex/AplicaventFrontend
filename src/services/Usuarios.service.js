import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ERROR401 } from "./handlingErrors";

const baseURL = process.env.REACT_APP_API_URL;


// PETICIONES
const getUsuariosService = async ({token, logout}) => {
    const MySwal = withReactContent(Swal);
    try {
        const { status, data } = await axios({
            method: "GET",
            url: `${baseURL}/usuarios`,
            headers: {
                'x-token': `${token}`
            }
        })
        if (status === 200) {
            return data.users;
        }
    } catch (error) {
        if (error.response.status === 401) {
            ERROR401(MySwal, logout, error);
        }else{
            throw error;
        }
    }
}

const getRolesService = async ({token, logout}) => {
    const MySwal = withReactContent(Swal);
    try {
        const { status, data } = await axios({
            method: "GET",
            url: `${baseURL}/usuarios/roles`,
            headers: {
                'x-token': `${token}`
            }
        })
        if (status === 200) {
            return data.roles;
        }
    } catch (error) {
        if (error.response.status === 401) {
            ERROR401(MySwal, logout, error);
        }else{
            throw error;
        }
    }
}

const getEstadosService = async ({token, logout}) => {
    const MySwal = withReactContent(Swal);
    try {
        const { status, data } = await axios({
            method: "GET",
            url: `${baseURL}/usuarios/estados`,
            headers: {
                'x-token': `${token}`
            }
        })
        if (status === 200) {
            return data.estados;
        }
    } catch (error) {
        if (error.response.status === 401) {
            ERROR401(MySwal, logout, error);
        }else{
            throw error;
        }
    }
}

const putUsuarioService = async ({token, logout}, usuario) => {
    const MySwal = withReactContent(Swal);
    try {
        const { status, data } = await axios({
            method: "PUT",
            url: `${baseURL}/usuarios/${usuario.id}`,
            headers: {
                'x-token': `${token}`
            },
            data: {
                rol: usuario.rol,
                status: usuario.status
            }
        })
        if (status === 200) {
            MySwal.fire({
                icon: "success",
                title: "Usuario actualizado",
                html: <h1>{data.msg}</h1>,
                timer: 1000,
                timerProgressBar: true,
            })
            return data.usuario;
        }
    } catch (error) {
        if (error.response.status === 401) {
            ERROR401(MySwal, logout, error);
        }else{
            throw error;
        }
    }
}

export { getUsuariosService, getRolesService, getEstadosService, putUsuarioService };