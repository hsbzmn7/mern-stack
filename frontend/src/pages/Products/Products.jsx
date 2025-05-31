import React from "react";
import Header from "../../components/Header";
import { EmptyComponent } from "../../components/Empty";
import { Container, Row, Col } from "react-bootstrap";

export const Products = () => {
  const sampleProducts = [
        {
            id: 1,
            name: "Wireless Headphones",
            description: "Noise cancelling over-ear headphones",
            banner: "https://res.cloudinary.com/da3w329cx/image/upload/v1683856487/samples/landscapes/nature-mountains.jpg",
            price: 120,
        },
        {
            id: 2,
            name: "Smart Watch",
            description: "Smart wearable with health tracking",
            banner: "https://res.cloudinary.com/da3w329cx/image/upload/v1683856580/cld-sample-5.jpg",
            price: 80,
        },
        {
            id: 3,
            name: "Laptop",
            description: "14-inch Full HD display, 256GB SSD",
            banner: "https://res.cloudinary.com/da3w329cx/image/upload/v1683856499/cld-sample-3.jpg",
            price: 600,
        },
    ];
  
  return (
    <section>
      <Header />
      <Container className="mt-4">
        <div className="d-flex justify-content-end mb-4">
          {/* <AddProduct /> */}
        </div>

        {sampleProducts.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <EmptyComponent message="We're currently out of stock" />
          </div>
        ) : (
          <Row className="g-4">
            {sampleProducts.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={3} lg={3}>
                {/* Product display would go here */}
                <div className="card">
                  <img src={product.banner} alt={product.name} className="card-img-top"/>
                  <div className="card-body">
                    <h5>{product.name}</h5>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};