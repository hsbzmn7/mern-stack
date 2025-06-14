import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { EmptyComponent } from "../../components/Empty";
import ProductCard from "../../components/ProductCard";
import ProductModal from "../../components/ProductModal";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

export const Products = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const result = await axios.get('/api/products');
      setProductList(result.data);
      setIsLoading(false);
    } catch (err) {
      setErrorMsg('Could not load products. Please try again later.');
      setIsLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProductList(productList.filter(item => item.id !== id));
    } catch (err) {
      setErrorMsg('Failed to remove product');
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
        const updated = await axios.put(`/api/products/${currentProduct.id}`, data);
        setProductList(productList.map(p => p.id === currentProduct.id ? updated.data : p));
      } else {
        // Create new
        const newProduct = await axios.post('/api/products', data);
        setProductList([...productList, newProduct.data]);
      }
      setCurrentProduct(null);
    } catch (err) {
      setErrorMsg('Could not save product changes');
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

  if (errorMsg) {
    return (
      <section>
        <Header />
        <Container className="mt-4">
          <div className="text-center text-danger">{errorMsg}</div>
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Header />
      <Container className="mt-4">
        <div className="d-flex justify-content-end mb-4">
          <Button 
            variant="primary" 
            onClick={() => setModalVisible(true)}
            className="px-4"
          >
            + New Product
          </Button>
        </div>

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
              <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard 
                  product={item} 
                  onDelete={() => removeProduct(item.id)}
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