/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
    getProductosService,
    putProductosService,
    postProductosService,
    postSearchProductosService,
} from "../services/Productos.service";
import useAuth from "../hooks/auth/useAuth";
import ListaProductos from "./ListaProductos";
import LogicaProductos from "./LogicaProductos";
import "./Productos.css"

const Productos = () => {
    const auth = useAuth();
    const [productos, setProductos] = useState([]);
    const [cargandoProductos, setCargandoProductos] = useState(true);

    const getData = () => {
        getProductosService(auth)
            .then((res) => {
                setCargandoProductos(true);
                setProductos(res);
                setCargandoProductos(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const cargando = () => cargandoProductos;

    const handleUpdateProducto = (producto) => {
        putProductosService(auth, producto)
            .then(() => {
                getData();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCreateProducto = (producto) => {
        postProductosService(auth, producto)
            .then(() => {
                getData();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSearchProducto = (producto) => {
        postSearchProductosService(auth, producto)
            .then((res) => {
                setCargandoProductos(true);
                setProductos([res]);
                setCargandoProductos(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const lista = (
        <table className="table-productos" >
            <thead className="table-head-productos" >
                <tr>
                    <th>ID</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {cargando()
                    ? null
                    : productos.map((producto) => (
                          <ListaProductos
                              key={producto._id}
                              producto={producto}
                              handleUpdateProducto={(e) =>
                                  handleUpdateProducto(e)
                              }
                          />
                      ))}
            </tbody>
        </table>
    );

    return (
        <>
            <div className="container-productos">
                <div className="container-productos-logicaProductos">
                    <h2>Modulo Productos</h2>
                    <LogicaProductos
                        handleCreateProducto={(e) => handleCreateProducto(e)}
                        handleSearchProducto={(e) => handleSearchProducto(e)}
                        getData={getData}
                    />
                </div>
                <div>
                    {productos.length > 0 ? lista : <h4>No hay productos</h4>}
                </div>
            </div>
        </>
    );
};

export default Productos;
