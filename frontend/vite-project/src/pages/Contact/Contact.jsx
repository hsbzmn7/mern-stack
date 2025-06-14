import React from 'react';
import Header from '../../components/Header';

const Contact = () => {
  return (
    <>
      <section>
        <Header />
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
          <div className="text-center p-4 border rounded bg-white shadow-sm">
            <h2 className="mb-4">Contact Us</h2>
            <p className="mb-2">
              <strong>Address:</strong> 123 React Street, UI City, CA 90210
            </p>
            <p className="mb-2">
              <strong>Email:</strong> hello@prodmanage.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
