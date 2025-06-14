import React from "react";
import { Card } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductCard = ({ product, onDelete, onEdit }) => {
    const confirmDelete = (e) => {
        e.preventDefault();
        const shouldDelete = window.confirm('Delete this product? This action cannot be undone.');
        if (shouldDelete) {
            onDelete();
        }
    };

    const startEdit = (e) => {
        e.preventDefault();
        onEdit();
    };

    return (
        <Card className="h-100 shadow-sm hover-shadow">
            <div className="position-relative">
                <Card.Img 
                    variant="top" 
                    src={product.banner} 
                    style={{ 
                        height: '200px', 
                        objectFit: 'cover',
                        borderTopLeftRadius: '0.375rem',
                        borderTopRightRadius: '0.375rem'
                    }}
                    alt={product.name}
                />
            </div>
            <Card.Body className="d-flex flex-column p-3">
                <Card.Title className="text-truncate mb-2">{product.name}</Card.Title>
                <Card.Text className="flex-grow-1 text-muted small">{product.description}</Card.Text>

                <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                    <span className="fw-bold text-primary">${product.price}</span>
                    <div className="d-flex gap-3">
                        <FaEdit 
                            role="button" 
                            className="text-success" 
                            title="Edit product"
                            onClick={startEdit}
                            style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                        />
                        <FaTrash 
                            role="button" 
                            className="text-danger" 
                            title="Delete product"
                            onClick={confirmDelete}
                            style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                        />
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;