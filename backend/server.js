import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5400;

app.use(cors());
app.use(express.json());

// In-memory products array
let products = [];
let currentId = 1;

// CREATE
app.post("/api/products", (req, res) => {
  try {
    const product = { id: currentId++, ...req.body };
    products.push(product);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
});

// READ all
app.get("/api/products", (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// READ one
app.get("/api/products/:id", (req, res) => {
  try {
    const product = products.find(p => p.id == req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

// UPDATE
app.put("/api/products/:id", (req, res) => {
  try {
    const index = products.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
      products[index] = { ...products[index], ...req.body };
      res.json(products[index]);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
});

// DELETE
app.delete("/api/products/:id", (req, res) => {
  try {
    const index = products.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
      products.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome, server is live");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});