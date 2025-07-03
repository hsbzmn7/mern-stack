import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Header from '../../components/Header';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section>
      <Header />
      <Container className="mt-5">
        <div className="text-center mb-5">
          <h1>Contact Us</h1>
          <p className="text-muted">Get in touch with us for any questions or concerns.</p>
        </div>

        <Row className="g-4">
          <Col lg={8}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h4 className="mb-4">Send us a Message</h4>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" size="lg">
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h4 className="mb-4">Contact Information</h4>
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <FaEnvelope className="text-primary me-3" size={20} />
                    <div>
                      <strong>Email</strong><br />
                      <a href="mailto:info@prodmanage.com">info@prodmanage.com</a>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <FaPhone className="text-primary me-3" size={20} />
                    <div>
                      <strong>Phone</strong><br />
                      <a href="tel:+1234567890">+1 (234) 567-890</a>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaMapMarkerAlt className="text-primary me-3" size={20} />
                    <div>
                      <strong>Address</strong><br />
                      123 Product Street<br />
                      Tech City, TC 12345
                    </div>
                  </div>
                </div>
                <div className="text-muted small">
                  <p>We typically respond within 24 hours during business days.</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
