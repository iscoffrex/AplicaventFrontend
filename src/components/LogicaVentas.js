import { useState } from "react";
import Autocompletado from "./Autocompletado";

const LogicaVentas = ({
    handleCreateVenta,
    productos,
    handleSearchVenta,
    getData,
}) => {
    const [buscador, setBuscador] = useState("");
    const [value, setValue] = useState({
        cedulaCliente: "",
        nombreCliente: "",
        producto: "",
        valorUnit: "",
        cantidad: "",
    });

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const handleProductoSelected = (producto) => {
        if (producto || producto !== null) {
            setValue({
                ...value,
                producto: productos[producto]._id,
                valorUnit: productos[producto].valorUnit,
            });
        } else {
            setValue({
                ...value,
                producto: "",
                valorUnit: "",
            });
        }
    };

    return (
        <>
            <div className="container-ventas-logicaVentas">
                <div className="container-ventas-logicaBuscar">
                    <label>Buscar Producto
                        <br/>
                        <input
                            name="buscador"
                            type="text"
                            value={buscador}
                            onChange={(e) => setBuscador(e.target.value)}
                            placeholder="Buscar..."
                            autoComplete="off"
                        />
                    </label>
                    <button
                        onClick={() => {
                            handleSearchVenta(buscador);
                            setBuscador("");
                        }}
                        disabled={buscador === ""}
                    >
                        Buscar
                    </button>
                    <button onClick={() => getData()}>Cargar Ventas</button>
                </div>
                <div className="container-ventas-logicaCrearVenta">
                    <label>Cedula del Cliente
                        <br/>

                        <input
                            name="cedulaCliente"
                            type="number"
                            placeholder="Cedula del Cliente"
                            value={value.cedulaCliente}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Nombre del Cliente
                        <br/>
                        <input
                            name="nombreCliente"
                            type="text"
                            placeholder="Nombre del Cliente"
                            value={value.nombreCliente}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </label>
                    <Autocompletado
                        nombreAutocompletado={"Producto"}
                        productos={productos}
                        handleProductoSelected={(e) =>
                            handleProductoSelected(e)
                        }
                    />
                    <label>Valor Unitario
                        <br/>
                        <input
                            name="valorUnit"
                            type="number"
                            placeholder="Precio del Producto"
                            disabled={true}
                            value={value.valorUnit}
                        />
                    </label>
                    <label>Cantidad
                        <br/>
                        <input
                            name="cantidad"
                            type="number"
                            placeholder="Cantidad"
                            value={value.cantidad}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Valor Total
                        <br/>
                        <input
                            name="valorTotal"
                            type="number"
                            placeholder="Valor Total"
                            disabled={true}
                            value={value.valorUnit * value.cantidad}
                        />
                    </label>
                    <button
                        onClick={() => {
                            handleCreateVenta(value);
                            setValue({
                                cedulaCliente: "",
                                nombreCliente: "",
                                producto: "",
                                valorUnit: "",
                                cantidad: "",
                            });
                        }}
                        disabled={
                            value.cedulaCliente === "" ||
                            value.nombreCliente === "" ||
                            value.producto === "" ||
                            value.valorUnit === "" ||
                            value.cantidad === ""
                        }
                    >
                        Crear Venta
                    </button>
                </div>
            </div>
        </>
    );
};

export default LogicaVentas;
