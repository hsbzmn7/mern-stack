import React, { useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Product name is required'),
  banner: Yup.string()
    .required('Banner is required'),
  description: Yup.string()
    .required('Description is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('price must be a positive number')
});

const defaultValues = {
  name: '',
  banner: '',
  description: '',
  price: 0
};

const ModalComponent = ({ show, handleClose, onSubmit, initialProduct }) => {
  const initialValues = {
    name: initialProduct?.name || defaultValues.name,
    banner: initialProduct?.banner || defaultValues.banner,
    description: initialProduct?.description || defaultValues.description,
    price: initialProduct?.price || defaultValues.price
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await onSubmit(values);
      resetForm();
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter title"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && errors.name}
                />
                <Form.Control.Feedback type="invalid" className="text-danger">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Banner</Form.Label>
                <Form.Control
                  type="text"
                  name="banner"
                  placeholder="Enter banner url"
                  value={values.banner}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.banner && errors.banner}
                />
                <Form.Control.Feedback type="invalid" className="text-danger">
                  {errors.banner}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={3}
                  placeholder="Enter description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.description && errors.description}
                />
                <Form.Control.Feedback type="invalid" className="text-danger">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="0"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.price && errors.price}
                />
                <Form.Control.Feedback type="invalid" className="text-danger">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={isSubmitting}
              >
                {initialProduct ? 'Update' : 'Add'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalComponent; 