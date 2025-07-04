# Backend API

## Authentication

### Register
- `POST /api/auth/register`
- Body: `{ name, email, password }`
- Response: Success message or error

### Login
- `POST /api/auth/login`
- Body: `{ email, password }`
- Response: `{ token, user }` or error

## Products
- `GET /api/products` (public)
- `POST /api/products` (auth required)
- `PUT /api/products/:id` (auth required)
- `DELETE /api/products/:id` (auth required)

## Environment Setup

1. Copy `.env.example` to `.env` and fill in your credentials:

```
MONGODB_URI=mongodb+srv://hsbzmn7:<password>@mern-stack.wxpqemy.mongodb.net/tutorial5?retryWrites=true&w=majority&appName=mern-stack
JWT_SECRET=your_jwt_secret_here
```

2. Never commit your real `.env` file to GitHub.

3. Set these environment variables in Render when deploying. 