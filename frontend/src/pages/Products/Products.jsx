import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { EmptyComponent } from "../../components/Empty";
import ProductCard from "../../components/ProductCard";
import ProductModal from "../../components/ProductModal";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { productsAPI } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

export const Products = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const { user } = useAuth();

  // Fetch products on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const result = await productsAPI.getAll();
      setProductList(result.data);
      setIsLoading(false);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Could not load products. Please try again later.');
      setIsLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      await productsAPI.delete(id);
      setProductList(productList.filter(item => item._id !== id));
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to remove product');
    }
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setModalVisible(true);
  };

  const saveProduct = async (data) => {
    try {
      if (currentProduct) {
        // Update existing
        const updated = await productsAPI.update(currentProduct._id, data);
        setProductList(productList.map(p => p._id === currentProduct._id ? updated.data : p));
      } else {
        // Create new
        const newProduct = await productsAPI.create(data);
        setProductList([...productList, newProduct.data]);
      }
      setCurrentProduct(null);
      setModalVisible(false);
      setErrorMsg(null);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Could not save product changes');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentProduct(null);
  };

  if (isLoading) {
    return (
      <section>
        <Header />
        <Container className="mt-4">
          <div className="text-center">Loading products...</div>
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Header />
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>Products</h2>
            <p className="text-muted">Welcome back, {user?.name}!</p>
          </div>
          <Button 
            variant="primary" 
            onClick={() => setModalVisible(true)}
            className="px-4"
          >
            + New Product
          </Button>
        </div>

        {errorMsg && (
          <Alert variant="danger" dismissible onClose={() => setErrorMsg(null)}>
            {errorMsg}
          </Alert>
        )}

        {productList.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <EmptyComponent message="No products available at the moment" />
          </div>
        ) : (
          <Row className="g-4">
            {productList.map((item) => (
              <Col key={item._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard 
                  product={item} 
                  onDelete={() => removeProduct(item._id)}
                  onEdit={() => openEditModal(item)}
                />
              </Col>
            ))}
          </Row>
        )}

        <ProductModal
          show={modalVisible}
          handleClose={closeModal}
          product={currentProduct}
          onSubmit={saveProduct}
        />
      </Container>
    </section>
  );
};