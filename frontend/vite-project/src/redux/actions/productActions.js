import { toast } from "react-toastify";

// Fetch
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

// Create
export const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";

// Update
export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAILURE";

// Delete
export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

// FETCH all products
export const fetchProducts = () => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
      const res = await fetch("http://localhost:5400/api/products");
      const data = await res.json();
  
      // console.log("products", data);
  
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: err.message });
      toast.error("Failed to fetch product");
    }
  };

  // CREATE product
export const addProduct = (product) => async (dispatch) => {
    // console.log("Product added", product);
  
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    try {
      const res = await fetch("http://localhost:5400/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
      toast.success("Product created successfully!");
    } catch (err) {
      dispatch({ type: CREATE_PRODUCT_FAILURE, payload: err.message });
      toast.error("Failed to create product");
    }
  };
  

  // UPDATE product
export const updateProduct = (product) => async (dispatch) => {
    console.log("Product updated", product);
  
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    try {
      const res = await fetch(`http://localhost:5400/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
  
      const data = await res.json();
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
      toast.success("Product updated successfully!");
    } catch (err) {
      dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: err.message });
      toast.error("Failed to update product");
    }
  };
  

  // DELETE product
export const deleteProduct = (id) => async (dispatch) => {
    console.log("Delete product", id);
  
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    try {
      await fetch(`http://localhost:5400/api/products/${id}`, {
        method: "DELETE",
      });
  
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
      toast.success("Product deleted successfully!");
    } catch (err) {
      dispatch({ type: DELETE_PRODUCT_FAILURE, payload: err.message });
      toast.error("Failed to delete product");
    }
  };
  