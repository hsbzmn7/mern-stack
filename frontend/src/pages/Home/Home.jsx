import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';

export const Home = () => {
  return (
    <section>
      <Header />
      <Container className="mt-4">
        <h1>Welcome to Our Store</h1>
        <p>Browse our collection of products and find what you need.</p>
      </Container>
    </section>
  );
};
