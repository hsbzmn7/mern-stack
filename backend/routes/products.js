import express from 'express';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';
import requireRole from '../middleware/role.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Create a new product (protected)
router.post('/',
  auth,
  [
    body('title').trim().notEmpty().withMessage('Title is required.'),
    body('description').trim().notEmpty().withMessage('Description is required.'),
    body('image').trim().notEmpty().withMessage('Image URL is required.'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number.')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const product = new Product(req.body);
      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product (protected)
router.put('/:id',
  auth,
  [
    body('title').optional().trim().notEmpty().withMessage('Title is required.'),
    body('description').optional().trim().notEmpty().withMessage('Description is required.'),
    body('image').optional().trim().notEmpty().withMessage('Image URL is required.'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number.')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Delete a product (admin only) - TEMPORARILY COMMENTED OUT FOR DEBUGGING
// router.delete('/:id', auth, requireRole('admin'), async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (product) {
//       res.json({ message: 'Product deleted' });
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

export default router; 