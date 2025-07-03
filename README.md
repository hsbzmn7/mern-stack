# MERN Stack Product Management System

A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) for managing products with CRUD operations.

## Features

- **Product Management**: Create, read, update, and delete products
- **Responsive Design**: Modern UI built with React Bootstrap
- **Real-time Updates**: Instant UI updates when products are modified
- **Image Support**: Products can include image URLs
- **Error Handling**: Comprehensive error handling and user feedback

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - JavaScript library for building user interfaces
- **React Router** - Client-side routing
- **React Bootstrap** - UI component library
- **Axios** - HTTP client
- **Vite** - Build tool and dev server

## Project Structure

```
Mern-stack/
├── backend/
│   ├── config/
│   │   └── db.js          # Database configuration
│   │   └── middleware/
│   │   └── errorHandler.js # Error handling middleware
│   │   └── models/
│   │   └── Product.js     # Product schema
│   │   └── routes/
│   │   └── products.js    # Product routes
│   │   └── server.js          # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.jsx        # Main app component
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   PORT=5400
   MONGODB_URI=mongodb://localhost:27017/tutorial5
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Product Schema
```javascript
{
  title: String (required),
  description: String (required),
  image: String (required),
  price: Number (required),
  createdAt: Date,
  updatedAt: Date
}
```

## Usage

1. **View Products**: Navigate to the Products page to see all available products
2. **Add Product**: Click the "+ New Product" button to create a new product
3. **Edit Product**: Click the edit icon on any product card to modify it
4. **Delete Product**: Click the delete icon on any product card to remove it

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License. 