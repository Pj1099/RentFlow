#!/bin/bash

echo "=========================================="
echo "Rental Management System - Setup Script"
echo "=========================================="
echo ""

echo "[1/5] Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "Node.js is installed: $(node --version)"
echo ""

echo "[2/5] Checking MongoDB installation..."
if ! command -v mongod &> /dev/null; then
    echo "WARNING: MongoDB might not be installed or not in PATH"
    echo "Please ensure MongoDB is installed and running"
    echo "Download from: https://www.mongodb.com/try/download/community"
    echo ""
fi
echo ""

echo "[3/5] Installing backend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies"
    exit 1
fi
echo "Backend dependencies installed successfully."
echo ""

echo "[4/5] Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi
cd ..
echo "Frontend dependencies installed successfully."
echo ""

echo "[5/5] Setup complete!"
echo ""
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo "1. Make sure MongoDB is running"
echo "2. Update the .env file with your configuration"
echo "3. Run 'npm run dev' to start the application"
echo "4. Open http://localhost:3000 in your browser"
echo "=========================================="
echo ""
