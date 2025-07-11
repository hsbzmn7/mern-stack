import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import { productsAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { isAuthenticated, user, loading: authLoading } = useAuth();

  useEffect(() => {
    // Only load products if authentication is not loading
    if (!authLoading) {
      loadFeaturedProducts();
    }
  }, [authLoading]);

  const loadFeaturedProducts = async () => {
    setIsLoading(true);
    setHasError(false);
    
    try {
      const result = await productsAPI.getAll();
      // Show first 4 products as featured
      setFeaturedProducts(result.data?.slice(0, 4) || []);
    } catch (err) {
      console.error('Error loading featured products:', err);
      setHasError(true);
      setFeaturedProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render anything while auth is loading
  if (authLoading) {
    return (
      <section>
        <Header />
        <Hero />
        <Container className="mt-5">
          <div className="text-center">Loading...</div>
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Header />
      <Hero />
      <Container className="mt-5">
        {isAuthenticated && (
          <div className="text-center mb-4">
            <h3>Welcome back, {user?.name}!</h3>
            <p className="text-muted">Manage your products and explore our collection</p>
          </div>
        )}
        
        <div className="text-center mb-5">
          <h2>Featured Products</h2>
          <p className="text-muted">Discover our most popular items</p>
        </div>

        {isLoading ? (
          <div className="text-center">Loading featured products...</div>
        ) : hasError ? (
          <div className="text-center">
            <p className="text-muted">Unable to load featured products at the moment.</p>
            <Button variant="outline-primary" onClick={loadFeaturedProducts}>
              Try Again
            </Button>
          </div>
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
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-truncate">{product.title}</Card.Title>
                    <Card.Text className="flex-grow-1 text-muted small">
                      {product.description?.substring(0, 100) || 'No description available'}...
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-primary">${product.price || 0}</span>
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
            {isAuthenticated ? (
              <Link to="/products">
                <Button variant="primary">Add Your First Product</Button>
              </Link>
            ) : (
              <div>
                <p className="mb-3">Sign in to start managing products</p>
                <Link to="/login" className="me-3">
                  <Button variant="primary">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline-primary">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-5">
          {isAuthenticated ? (
            <Link to="/products">
              <Button variant="primary" size="lg">
                Manage Products
              </Button>
            </Link>
          ) : (
            <Link to="/products">
              <Button variant="primary" size="lg">
                View All Products
              </Button>
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Home;
