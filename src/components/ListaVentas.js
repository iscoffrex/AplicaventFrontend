import { useState } from "react";
import Autocompletado from "./Autocompletado2";

const VentaNormal = ({ venta, setActualizar }) => {
    return (
        <>
            <tr key={venta._id}>
                <td>{venta.id}</td>
                <td>{venta.cedulaCliente}</td>
                <td>{venta.nombreCliente}</td>
                <td>{venta.producto.descripcion}</td>
                <td>{venta.producto.valorUnit}</td>
                <td>{venta.cantidad}</td>
                <td>{venta.producto.valorUnit * venta.cantidad}</td>
                <td>{venta.fechaDeVenta}</td>
                <td>{venta.estado.name}</td>
                <td>{venta.idVendedor.name}</td>
                <td>
                    <button onClick={() => setActualizar(true)}>Editar</button>
                </td>
            </tr>
        </>
    );
};

const VentaActualizar = ({
    venta,
    productos,
    estados,
    setActualizar,
    handleUpdateVenta,
}) => {
    const [value, setValue] = useState({
        _id: venta._id,
        id: venta.id,
        cedulaCliente: venta.cedulaCliente,
        nombreCliente: venta.nombreCliente,
        producto: venta.producto._id,
        valorUnit: venta.producto.valorUnit,
        cantidad: venta.cantidad,
        fechaDeVenta: venta.fechaDeVenta,
        estado: venta.estado._id,
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
            <tr key={value._id}>
                <td>{value.id}</td>
                <td>
                    <input
                        name="cedulaCliente"
                        type="number"
                        defaultValue={value.cedulaCliente}
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <input
                        name="nombreCliente"
                        type="text"
                        defaultValue={value.nombreCliente}
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <Autocompletado
                        nombreAutocompletado={"Producto"}
                        productos={productos}
                        handleProductoSelected={(e) =>
                            handleProductoSelected(e)
                        }
                        productoEditar={venta.producto.id - 1}
                    />
                </td>
                <td>
                    <input
                        className="input-venta-number"
                        name="valorUnit"
                        type="number"
                        value={value.valorUnit}
                        onChange={handleChange}
                        disabled={true}
                    />
                </td>
                <td>
                    <input
                        name="cantidad"
                        type="number"
                        defaultValue={value.cantidad}
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <input
                        className="input-venta-number"
                        type="number"
                        value={value.valorUnit * value.cantidad}
                        disabled={true}
                    />
                </td>
                <td>
                    <input
                        name="fechaDeVenta"
                        type="date"
                        defaultValue={value.fechaDeVenta}
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <select
                        name="estado"
                        defaultValue={value.estado}
                        onChange={handleChange}
                    >
                        {estados.map((estado) => (
                            <option key={estado._id} value={estado._id}>
                                {estado.name}
                            </option>
                        ))}
                    </select>
                </td>
                <td>{venta.idVendedor.name}</td>
                <td>
                    <button
                        onClick={() => {
                            handleUpdateVenta(value);
                            setActualizar(false);
                        }}
                        disabled={
                            value.cedulaCliente === "" ||
                            value.nombreCliente === "" ||
                            value.producto === "" ||
                            value.valorUnit === "" ||
                            value.cantidad === "" ||
                            value.fechaDeVenta === "" ||
                            value.estado === ""
                        }
                    >
                        Guardar
                    </button>
                    <button onClick={() => setActualizar(false)}>
                        Cancelar
                    </button>
                </td>
            </tr>
        </>
    );
};

const ListaVentas = ({ venta, productos, estados, handleUpdateVenta }) => {
    const [actualizar, setActualizar] = useState(false);

    return (
        <>
            {actualizar ? (
                <VentaActualizar
                    venta={venta}
                    productos={productos}
                    estados={estados}
                    setActualizar={setActualizar}
                    handleUpdateVenta={(e) => handleUpdateVenta(e)}
                />
            ) : (
                <VentaNormal venta={venta} setActualizar={setActualizar} />
            )}
        </>
    );
};
export default ListaVentas;
