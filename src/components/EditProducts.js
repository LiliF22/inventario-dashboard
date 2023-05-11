import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditProducts = () => {
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [state, setState] = useState("no-inventory");
    const [sku, setSku] = useState("");
    const [name, setName] = useState("");
    const [category_id, setCategory_id] = useState("1");
    const { id } = useParams();
    const navigate = useNavigate();

    const update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/product/${id}}`, {name: name, description: description, price: price, quantity: quantity, state: state, sku: sku, category_id: category_id})
            .then((response) => {
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
            Swal.fire("El producto ha sido actualizado");
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${id}`)
            .then((response) => {
                const { name, description, price, quantity, state, sku, category_id } = response.data;
                setName(name);
                setDescription(description);
                setPrice(price);
                setQuantity(quantity);
                setState(state);
                setSku(sku);
                setCategory_id(category_id);
            })
            .catch((error) => {
                console.log(error);
            });// eslint-disable-next-line
    }, []);

    return (
        <div className="container">
            <h1>Editar Producto</h1>
            <form onSubmit={update}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Sku</label>
                    <input type="text" className="form-control" value={sku} onChange={(e) => setSku(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cantidad</label>
                    <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select className="form-control" value={state} onChange={(e) => setState(e.target.value)}>
                        <option value='with-inventory'>Con inventario</option>
                        <option value='no-inventory'>Sin inventario</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Categoria</label>
                    <select className="form-control" value={category_id} onChange={(e) => setCategory_id(e.target.value)}>
                        <option value='1'>Categoria 1</option>
                        <option value='2'>Categoria 2</option>
                        <option value='3'>Categoria 3</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    )

}
export default EditProducts;