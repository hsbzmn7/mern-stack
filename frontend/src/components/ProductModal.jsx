import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProductModal = ({ show, handleClose, product, onSubmit }) => {
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        price: '',
        image: ''
    });

    useEffect(() => {
        if (product) {
            setFormValues({
                title: product.title || '',
                description: product.description || '',
                price: product.price || '',
                image: product.image || ''
            });
        } else {
            setFormValues({
                title: '',
                description: '',
                price: '',
                image: ''
            });
        }
    }, [product]);

    const updateField = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submitForm = (e) => {
        e.preventDefault();
        onSubmit(formValues);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {product ? 'Update Product' : 'Add New Product'}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={submitForm}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formValues.title}
                            onChange={updateField}
                            placeholder="Enter product title"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formValues.description}
                            onChange={updateField}
                            placeholder="Enter product description"
                            rows={3}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price ($)</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formValues.price}
                            onChange={updateField}
                            placeholder="Enter price"
                            min="0"
                            step="0.01"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="url"
                            name="image"
                            value={formValues.image}
                            onChange={updateField}
                            placeholder="Enter image URL"
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        {product ? 'Save Changes' : 'Add Product'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ProductModal;
