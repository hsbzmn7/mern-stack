#!/bin/bash

# Start the development servers for both backend and frontend

echo "Starting MERN Stack Development Servers..."

# Start backend server
echo "Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "Starting frontend server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "Both servers are starting..."
echo "Backend will be available at: http://localhost:5400"
echo "Frontend will be available at: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop the servers
wait 