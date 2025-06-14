import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';

export const Contact = () => {
  return (
    <section>
      <Header />
      <Container className="mt-4">
        <h1>Contact Us</h1>
        <p>Get in touch with us for any questions or concerns.</p>
      </Container>
    </section>
  );
};
