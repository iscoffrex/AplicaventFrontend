/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useState } from 'react'


import "./Autocompletado.css"

export default function Autocompletado({nombreAutocompletado, productos, handleProductoSelected}) {
    const [buscar, setBuscar] = useState("")
    const [selectProducto, setSelectProducto] = useState(null)
    const [productosFiltrados, setProductosFiltrados] = useState([])
    const [mostrar, setMostrar] = useState(true)
    const [anchoInput, setAnchoInput] = useState("")

    const listaProductos = () => {
        const arrProductosTemp = []
        if (buscar.length >= 2) {
            productos.map((producto) => {
                if (producto.estado){
                    let nombreProducto = producto.descripcion.toLowerCase()
                    if (nombreProducto.indexOf(buscar.toLowerCase()) !== -1) {
                        return arrProductosTemp.push(producto)
                    }else {
                        return null
                    }
                } else {
                    return null
                }
            })
            setProductosFiltrados([...arrProductosTemp])
        } 
    }

    const styles = {
        mostrar: {
            display: mostrar ? "block" : "none",
            width: anchoInput
        }
    }
    const listar_Productos = productosFiltrados.map((producto) => (<li key={producto.id} onClick={e => (setSelectProducto(producto.id-1))}>{producto.descripcion}</li>))

    const input = () => {
        if (selectProducto !== null) {
            return (
                <input type="text" autoComplete="off" onChange={e => {setBuscar(e.target.value); listaProductos(); setSelectProducto(null);  e.target.value.length <= 2 ? setMostrar(false) : setMostrar(true)}} value={productos[selectProducto].descripcion} placeholder={nombreAutocompletado} name={nombreAutocompletado} className="fields"></input>
            )
        } else {
            return (
                <input type="text" autoComplete="off" onChange={e => {setBuscar(e.target.value); listaProductos(); e.target.value.length <= 2 ? setMostrar(false) : setMostrar(true)}} placeholder={nombreAutocompletado} value={buscar} name={nombreAutocompletado} className="fields"></input>
            )
        }
    }


    useEffect(() => {
        input()
        handleProductoSelected(selectProducto)
    }, [selectProducto])

    return (
        <label className="autocompletado" onFocus={e => setAnchoInput(window.getComputedStyle(e.target).getPropertyValue("width"))}>
            {nombreAutocompletado} <br/>
            {input()}
            <div className="container-lista">
                <ul className="autocompletado-results" style={styles.mostrar} onClick={e => {setMostrar(false); }}>
                    {productosFiltrados.length > 0 ? listar_Productos : null }   
                </ul>
            </div>
        </label>

    )
}