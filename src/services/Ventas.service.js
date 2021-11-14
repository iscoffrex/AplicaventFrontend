import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ERROR401 } from "./handlingErrors";

const baseURL = process.env.REACT_APP_API_URL;

const getVentasService = async ({ token, logout }) => {
    const MySwal = withReactContent(Swal);
    try {
        const { status, data } = await axios({
            method: "GET",
            url: `${baseURL}/ventas/listarVentas`,
            headers: {
                "x-token": `${token}`,
            },
        });
        if (status === 200) {
            return data.ventas;
        }
        
    } catch (error) {
        if(error.response.status === 401){
            ERROR401(MySwal, logout, error);
        }else{
            throw error;
        }
    }
}

const postCrearVentaService = async ({ token, logout, user }, {cedulaCliente, nombreCliente, producto, cantidad}) => {
    const venta = {
        cedulaCliente,
        nombreCliente,
        producto,
        cantidad,
        idVendedor: user.uid
    }
    const MySwal = withReactContent(Swal);
    try {
        const { status } = await axios({
            method: "POST",
            url: `${baseURL}/ventas/crearVenta`,
            headers: {
                "x-token": `${token}`,
            },
            data: {
                ...venta,
            },
        });
        if (status === 201) {
            MySwal.fire({
                title: "Venta creada",
                text: "La venta se ha creado correctamente",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    } catch (error) {
        if(error.response.status === 401){
            ERROR401(MySwal, logout, error);
        }else if(error.response.status === 400){
            MySwal.fire({
                title: "Error",
                text: "No se pudo crear la venta",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
            throw error;
        }else{
            throw error;
        }
    }
}

const getEstadosVentasService = async ({ token, logout }) => {
    const MySwal = withReactContent(Swal);
    try {
        const { status, data } = await axios({
            method: "GET",
            url: `${baseURL}/ventas/estados`,
            headers: {
                "x-token": `${token}`,
            },
        });
        if (status === 200) {
            return data.estados;
        }
    } catch (error) {
        if(error.response.status === 401){
            ERROR401(MySwal, logout, error);
        }else{
            throw error;
        }
    }
}

const postUpdateVenta = async ({ token, logout }, {id, cedulaCliente, nombreCliente, producto, cantidad, fechaDeVenta, estado}) => {
    const venta = {
        id,
        cedulaCliente,
        nombreCliente,
        producto,
        cantidad,
        fechaDeVenta,
        estado
    }
    const MySwal = withReactContent(Swal);
    try {
        const { status } = await axios({
            method: "POST",
            url: `${baseURL}/ventas/actualizarVenta`,
            headers: {
                "x-token": `${token}`,
            },
            data: {
                ...venta
            }
        });
        if (status === 200) {
            MySwal.fire({
                title: "Venta actualizada",
                text: "La venta se ha actualizado correctamente",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    } catch (error) {
        if(error.response.status === 401){
            ERROR401(MySwal, logout, error);
        }else if(error.response.status === 400){
            MySwal.fire({
                title: "Error",
                text: "No se pudo actualizar la venta",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
            throw error;
        }else{
            throw error;
        }
    }
}

const getBuscarVentaService = async ({ token, logout }, ventaSearch) => {
    const MySwal = withReactContent(Swal);
    try {
        const { status, data } = await axios({
            method: "POST",
            url: `${baseURL}/ventas/buscarVenta/`,
            headers: {
                "x-token": `${token}`,
            },
            data: {
                ventaSearch
            }
        });
        if (status === 202) {
            return data.venta;
        }
    } catch (error) {
        if(error.response.status === 401){
            ERROR401(MySwal, logout, error);
        }else if(error.response.status === 404){
            MySwal.fire({
                title: "Error",
                text: error.response.data.msg,
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
            throw error;
        }else {
            throw error;
        }
    }
}

export { getVentasService, postCrearVentaService, getEstadosVentasService, postUpdateVenta, getBuscarVentaService };