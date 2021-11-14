import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ERROR401 } from "./handlingErrors";

const baseURL = process.env.REACT_APP_API_URL;

//PETICIONES

const getProductosService = async ({ token, logout }) => {
    const MySwal = withReactContent(Swal);
    try {
        const { status, data } = await axios({
            method: "GET",
            url: `${baseURL}/productos/listarProductos`,
            headers: {
                "x-token": `${token}`,
            },
        });
        if (status === 200) {
            return data.productos;
        }
    } catch (error) {
        if (error.response.status === 401) {
            ERROR401(MySwal, logout, error);
        } else {
            throw error;
        }
    }
};

const putProductosService = async ({ token, logout }, producto) => {
    const MySwal = withReactContent(Swal);
    console.log(producto);
    try {
        const { status, data } = await axios({
            method: "PUT",
            url: `${baseURL}/productos/actualizarProducto`,
            headers: {
                "x-token": `${token}`,
            },
            data: producto,
        });
        if (status === 200) {
            MySwal.fire({
                icon: "success",
                title: "Producto actualizado",
                html: <h1>{data.msg}</h1>,
                timer: 1000,
                timerProgressBar: true,
            })
            return data;
        }
    } catch (error) {
        if (error.response.status === 401) {
            ERROR401(MySwal, logout, error);
        } else {
            throw error;
        }
    }
}

const postProductosService = async ({ token, logout }, producto) => {
    const MySwal = withReactContent(Swal);
    try {
        const { status, data } = await axios({
            method: "POST",
            url: `${baseURL}/productos/crearProducto`,
            headers: {
                "x-token": `${token}`,
            },
            data: producto,
        });
        if (status === 201) {
            MySwal.fire({
                icon: "success",
                title: "Producto creado",
                html: <h1>{data.msg}</h1>,
                timer: 1000,
                timerProgressBar: true,
            })
            return data;
        }
    } catch (error) {
        if (error.response.status === 401) {
            ERROR401(MySwal, logout, error);
        } else if (error.response.status === 400) {
            MySwal.fire({
                icon: "error",
                title: "Error",
                html: <h1>{error.response.data.msg}</h1>,
                timer: 1000,
                timerProgressBar: true,
            })
        } else {
            throw error;
        }
    }
}

const postSearchProductosService = async ({ token, logout }, producto) => {
    const MySwal = withReactContent(Swal);
    try {
        const { status, data } = await axios({
            method: "POST",
            url: `${baseURL}/productos/buscarProducto`,
            headers: {
                "x-token": `${token}`,
            },
            data: producto,
        });
        if (status === 202) {
            return data.producto;
        }
    } catch (error) {
        if (error.response.status === 401) {
            ERROR401(MySwal, logout, error);
        } else if(error.response.status === 404){
            MySwal.fire({
                icon: "error",
                title: "Error",
                html: <h1>{error.response.data.msg}</h1>,
                timer: 2000,
                timerProgressBar: true,
            })
            throw error;
        } else {
            throw error;
        }
    }
}

export { getProductosService, putProductosService, postProductosService, postSearchProductosService };
