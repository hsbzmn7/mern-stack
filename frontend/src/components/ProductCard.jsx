import React from "react";
import { Card } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductCard = ({ product }) => {
    return (
        <Card style={{ width: "18rem" }} key={product.id}>
            <Card.Img variant="top" src={product.banner} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="fw-bold text-primary">${product.price}</span>
                    <div className="d-flex gap-3">
                        <FaEdit role="button" className="text-success" title="Edit" />
                        <FaTrash role="button" className="text-danger" title="Delete" />
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;