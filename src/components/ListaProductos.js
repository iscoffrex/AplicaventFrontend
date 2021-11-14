import { useState } from "react";

const ProductoNormal = ({ producto, handlingEditar }) => (
    <>
        <tr key={producto._id}>
            <td>{producto.id}</td>
            <td>{producto.descripcion}</td>
            <td>{producto.valorUnit}</td>
            <td>{producto.estado ? "Disponible" : "No disponible"}</td>
            <td>
                <button onClick={() => handlingEditar(true)}>
                    Editar
                </button>
            </td>
        </tr>
    </>
);

const ProductoActualizar = ({
    producto,
    handlingEditar,
    handleUpdateProducto,
}) => {
    const [value, setValue] = useState({
        _id: producto._id,
        id: producto.id,
        descripcion: producto.descripcion,
        valorUnit: producto.valorUnit,
        estado: producto.estado,
    });

    const handleChange = ({ target }) => {
        setValue({
            ...value,
            [target.name]:
                target.name === "estado"
                    ? target.value === "Disponible"
                        ? true
                        : false
                    : target.value,
        });
    };

    return (
        <>
            <tr key={value._id}>
                <td>{value.id}</td>
                <td>
                    <input
                        name="descripcion"
                        type="text"
                        defaultValue={value.descripcion}
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <input
                        name="valorUnit"
                        type="number"
                        defaultValue={value.valorUnit}
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <select
                        name="estado"
                        defaultValue={
                            value.estado ? "Disponible" : "No disponible"
                        }
                        onChange={handleChange}
                    >
                        <option value="Disponible" key="Disponible">
                            Disponible
                        </option>
                        <option value="No disponible" key="No disponible">
                            No disponible
                        </option>
                    </select>
                </td>
                <td>
                    <button
                        onClick={() => {
                            handleUpdateProducto(value);
                            handlingEditar(false);
                        }}
                    >
                        Guardar
                    </button>
                    <button onClick={() => handlingEditar(false)}>Cancelar</button>
                </td>
            </tr>
        </>
    );
};

const ListaProductos = ({ producto, handleUpdateProducto }) => {
    const [editar, setEditar] = useState(false);

    const handlingEditar = (editar) => {
        setEditar(editar);
    };

    return (
        <>
            {editar ? (
                <ProductoActualizar
                    producto={producto}
                    handlingEditar={(e) => handlingEditar(e)}
                    handleUpdateProducto={(e) => handleUpdateProducto(e)}
                />
            ) : (
                <ProductoNormal
                    producto={producto}
                    handlingEditar={(e) => handlingEditar(e)}
                />
            )}
        </>
    );
};

export default ListaProductos;
