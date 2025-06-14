import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Container, Row, Col, Card, Button, Modal, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ModalComponent from '../../components/ModalComponent';
import axios from 'axios';

const ProductCard = ({ product, onEdit, onDelete }) => {

  const displayTitle = product.title || product.name;
  const displayImage = product.image || product.banner;
  const displayPrice = Number(product.price).toFixed(2);

  return (
    <Card className="h-100">
      <Card.Img 
        variant="top" 
        src={displayImage}
        style={{ 
          height: '280px',
          objectFit: 'contain',
          padding: '1rem',
          backgroundColor: '#f8f9fa'
        }} 
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h5 mb-2">{displayTitle}</Card.Title>
        <Card.Text className="text-muted mb-3" style={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineHeight: '1.5em',
          maxHeight: '3em'
        }}>
          {product.description}
        </Card.Text>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Card.Text className="fw-bold mb-0">${displayPrice}</Card.Text>
          <div>
            <Button variant="outline-success" size="sm" className="me-2" onClick={() => onEdit(product)}>
              <FaEdit />
            </Button>
            <Button variant="outline-danger" size="sm" onClick={() => onDelete(product)}>
              <FaTrash />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };
  
  const handleShow = () => setShowModal(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5400/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    const mappedProduct = {
      id: product.id,
      name: product.title || product.name,
      banner: product.image || product.banner,
      description: product.description,
      price: product.price
    };
    setSelectedProduct(mappedProduct);
    setShowModal(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      setLoading(true);
      await axios.delete(`http://localhost:5400/api/products/${productToDelete.id}`);
      setProducts(products.filter(product => product.id !== productToDelete.id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (err) {
      console.error('Delete failed:', err);
      setError('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (values) => {
    try {
      const productData = {
        title: values.name,
        image: values.banner,
        description: values.description,
        price: Number(values.price)
      };

      const response = await axios.post('http://localhost:5400/api/products', productData);
      
      const newProduct = {
        ...response.data,
        id: response.data.id,
        title: response.data.title || values.name,
        image: response.data.image || values.banner,
        description: response.data.description || values.description,
        price: Number(response.data.price || values.price)
      };

      setProducts([...products, newProduct]);
      handleClose();
    } catch (err) {
      console.error('Add product failed:', err);
      setError('Failed to add product');
    }
  };

  const handleUpdateProduct = async (values) => {
    try {
      const updateData = {
        title: values.name,
        image: values.banner,
        description: values.description,
        price: Number(values.price)
      };

      const response = await axios.put(`http://localhost:5400/api/products/${selectedProduct.id}`, updateData);
      
      setProducts(products.map(product => 
        product.id === selectedProduct.id ? {
          ...response.data,
          title: response.data.title || response.data.name,
          image: response.data.image || response.data.banner
        } : product
      ));
      
      handleClose();
    } catch (err) {
      console.error('Update failed:', err);
      setError('Failed to update product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section>
        <Header />
        <Container className="mt-4">
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <Header />
        <Container className="mt-4">
          <div className="text-center text-danger">{error}</div>
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Header />
      <Container className="mt-4">
        <div className="d-flex justify-content-end mb-4">
          <Button variant="primary" onClick={handleShow} className="d-flex align-items-center gap-2">
            <FaPlus /> Add Product
          </Button>
        </div>

        {products.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <p>We're currently out of stock</p>
          </div>
        ) : (
          <Row className="g-4">
            {products.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard 
                  product={product} 
                  onEdit={handleEdit}
                  onDelete={() => handleDeleteClick(product)}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{productToDelete?.title || productToDelete?.name}"?
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteConfirm}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>

      <ModalComponent 
        show={showModal} 
        handleClose={handleClose}
        onSubmit={selectedProduct ? handleUpdateProduct : handleAddProduct}
        initialProduct={selectedProduct}
      />
    </section>
  );
}

export default Products;
