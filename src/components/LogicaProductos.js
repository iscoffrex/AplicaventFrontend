import { useState } from "react";

const LogicaProductos = ({
    handleCreateProducto,
    handleSearchProducto,
    getData,
}) => {
    const [productoBuscar, setProductoBuscar] = useState({ buscador: "" });
    const [value, setValue] = useState({
        descripcion: "",
        valorUnit: "",
        estado: true,
    });

    const handleSearch = ({ target }) => {
        setProductoBuscar({
            ...productoBuscar,
            [target.name]: target.value,
        });
    };

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
            <div>
                <div className="container-productos-buscarProducto">
                    <label>Buscar Producto
                    <br />
                    <input
                        id="buscador"
                        name="buscador"
                        type="text"
                        value={productoBuscar.buscador}
                        onChange={handleSearch}
                        placeholder="Buscar..."
                    />
                    </label> 

                    <button
                        onClick={() => {
                            handleSearchProducto(productoBuscar);
                            setProductoBuscar({ buscador: "" });
                        }}
                        disabled={productoBuscar.buscador === ""}
                    >
                        Buscar Producto
                    </button>
                    <button onClick={() => getData()}>Cargar Productos</button>
                    <br />
                </div>
                <div className="container-productos-crearProducto">
                    <label>
                        Descripcion del Producto
                        <br />
                        <input
                            id="descripcion"
                            name="descripcion"
                            type="text"
                            value={value.descripcion}
                            onChange={handleChange}
                            placeholder="Descripcion"
                        />
                    </label>
                    <label>
                        Valor Unitario
                        <br />
                        <input
                            id="valorUnit"
                            name="valorUnit"
                            type="number"
                            value={value.valorUnit}
                            onChange={handleChange}
                            placeholder="Precio del Producto"
                        />
                    </label>
                    <select
                        name="estado"
                        defaultValue={
                            value.estado ? "Disponible" : "No disponible"
                        }
                        onChange={handleChange}
                    >
                        <option value="Disponible">Disponible</option>
                        <option value="No disponible">No disponible</option>
                    </select>
                    <button
                        onClick={() => {
                            handleCreateProducto(value);
                            setValue({
                                descripcion: "",
                                valorUnit: "",
                                estado: true,
                            });
                        }}
                        disabled={
                            value.descripcion === "" || value.valorUnit === ""
                        }
                    >
                        Crear Producto
                    </button>
                </div>
            </div>
        </>
    );
};

export default LogicaProductos;
