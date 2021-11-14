/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
    getVentasService,
    postCrearVentaService,
    getEstadosVentasService,
    postUpdateVenta,
    getBuscarVentaService,
} from "../services/Ventas.service";
import useAuth from "../hooks/auth/useAuth";
import LogicaVentas from "./LogicaVentas";
import ListaVentas from "./ListaVentas";
import { getProductosService } from "../services/Productos.service";
import "./Ventas.css"

const Ventas = () => {
    const auth = useAuth();
    const [ventas, setVentas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [estados, setEstados] = useState([]);

    const getData = () => {
        getVentasService(auth)
            .then((ventas) => {
                setVentas(ventas);
            })
            .catch((err) => {
                console.log(err);
            });

        getProductosService(auth)
            .then((productos) => {
                setProductos(productos);
            })
            .catch((err) => {
                console.log(err);
            });

        getEstadosVentasService(auth)
            .then((estados) => {
                setEstados(estados);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const handleCreateVenta = (ventaCreate) => {
        postCrearVentaService(auth, ventaCreate)
            .then(() => {
                getData();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleUpdateVenta = (ventaUpdate) => {
        postUpdateVenta(auth, ventaUpdate)
            .then(() => {
                getData();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSearchVenta = (ventaSearch) => {
        getBuscarVentaService(auth, ventaSearch)
            .then((ventas) => {
                setVentas(ventas);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const lista = (
        <table className="table-ventas">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Cedula del Cliente</th>
                    <th>Nombre del Cliente</th>
                    <th>Producto</th>
                    <th>Valor Unitario</th>
                    <th>Cantidad</th>
                    <th>Valor Total</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Vendedor</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="table-ventas-body">
                {ventas.map((venta) => (
                    <ListaVentas
                        key={venta._id}
                        venta={venta}
                        productos={productos}
                        estados={estados}
                        handleUpdateVenta={(e) => handleUpdateVenta(e)}
                    />
                ))}
            </tbody>
        </table>
    );

    return (
        <>
            <div className="container-ventas">
                <div className="container-ventas-logica">
                    <h2>Modulo Ventas</h2>
                    <LogicaVentas
                        handleCreateVenta={(e) => handleCreateVenta(e)}
                        productos={productos}
                        handleSearchVenta={(e) => handleSearchVenta(e)}
                        getData={() => getData()}
                    />
                </div>
                <div>
                    {ventas.length > 0 ? lista : <h4>No hay ventas</h4>}
                </div>
            </div>
        </>
    );
};

export default Ventas;
