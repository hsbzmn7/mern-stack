import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import { productsAPI } from '../../services/api';

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const result = await productsAPI.getAll();
      // Show first 4 products as featured
      setFeaturedProducts(result.data.slice(0, 4));
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading featured products:', err);
      setIsLoading(false);
    }
  };

  return (
    <section>
      <Header />
      <Hero />
      <Container className="mt-5">
        <div className="text-center mb-5">
          <h2>Featured Products</h2>
          <p className="text-muted">Discover our most popular items</p>
        </div>

        {isLoading ? (
          <div className="text-center">Loading featured products...</div>
        ) : featuredProducts.length > 0 ? (
          <Row className="g-4">
            {featuredProducts.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={3}>
                <Card className="h-100 shadow-sm">
                  <Card.Img 
                    variant="top" 
                    src={product.image} 
                    style={{ height: '200px', objectFit: 'cover' }}
                    alt={product.title}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-truncate">{product.title}</Card.Title>
                    <Card.Text className="flex-grow-1 text-muted small">
                      {product.description.substring(0, 100)}...
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-primary">${product.price}</span>
                      <Button variant="outline-primary" size="sm">
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center">
            <p>No products available yet.</p>
            <Link to="/products">
              <Button variant="primary">Browse All Products</Button>
            </Link>
          </div>
        )}

        <div className="text-center mt-5">
          <Link to="/products">
            <Button variant="primary" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};
