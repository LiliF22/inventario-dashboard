import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RatingStars from "./Rating";

const DetailsProducts = () => {
    const [product, setProduct] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${id}`)
        .then((response) => {
            setProduct(response.data);
        })
        .catch((error) => {
            console.log(error);
        });// eslint-disable-next-line
    }, []);
    return (
        <div className="container">
            <div className="d-flex align-items-center justify-content-center">
            <img src="img/apple.jpg" width="200" height="200" alt="apple" className=""></img>
                <div className="d-flex flex-column align-items-start">
                    <h4>{product.name}</h4>
                    <div>Stock: {product.quantity}</div>
                    <div>Sku: {product.sku}</div>
                    <div className="d-flex align-items-center gap-2">
                        <span>${product.price}</span>
                        <RatingStars />
                    </div>
                    <span className="text-success">{product.state === "no-inventory" ? "Sin Inventario": "Con inventario"}</span>
                    <div className="text-muted">{product.description}</div>
                </div>
            </div>
        </div>
    )
}
export default DetailsProducts;