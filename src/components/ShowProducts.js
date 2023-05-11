import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import { Rating } from "@mui/material";

const ShowProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = () => {
        axios.get("http://localhost:8000/api/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteProduct = (id) => {
        axios.delete(`http://localhost:8000/api/product/${id}`)
            .then((response) => {
                getAllProducts();
            })
            .catch((error) => {
                console.log(error);
            });
        Swal.fire("El producto ha sido eliminado");
    }

    return (
        <div className="container">
            <div className="d-flex align-items-center justify-content-center py-4">
                <Link to="/create" className="btn btn-green text-white">Add Product</Link>
            </div>
                {products.map((product) => (
                        <div className="row border rounded mt-4">
                            <div className="d-flex align-items-center col-sm-9">
                                <img src="img/apple.jpg" width="160" height="160" alt="apple"></img>
                                <div className="d-flex flex-column align-items-start">
                                    <h4>{product.name}</h4>
                                    <div>
                                        <Rating />
                                    </div>
                                    <span className="text-success">{product.state === "no-inventory" ? "Sin Inventario": "Con inventario"}</span>
                                    <Link to={`/details/${product.id}`} className="btn btn-blue text-white btn-sm rounded">Ver detalles</Link>
                                </div>
                            </div>
                            <div className="col-sm-3 border border-left py-4">
                                <div className="d-flex flex-column text-center gap-2">
                                    <h3 >${product.price}</h3>
                                    <span className="text-muted">Sku: {product.sku}</span>
                                    <Link to={`/edit/${product.id}`} className="btn btn-purple btn-sm btn-block rounded text-white">Edit</Link>
                                    <button onClick={() => deleteProduct(product.id)} className="btn btn-red btn-sm btn-block text-white rounded">Delete</button>
                                </div>
                            </div>
                        </div>
                ))}
        </div>
    );
}
export default ShowProducts;