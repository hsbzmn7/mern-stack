import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import ProductModal from '../../components/ModalComponent';
import{ Formik } from "formik";
import * as Yup from "yup";

const ProductModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      
      <ProductModal show={showModal} handleClose={handleClose} />
    </>
  );
};

export default ProductModal; 