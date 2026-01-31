@echo off
echo ==========================================
echo Rental Management System - Setup Script
echo ==========================================
echo.

echo [1/5] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js is installed.
echo.

echo [2/5] Checking MongoDB installation...
mongod --version >nul 2>&1
if errorlevel 1 (
    echo WARNING: MongoDB might not be installed or not in PATH
    echo Please ensure MongoDB is installed and running
    echo Download from: https://www.mongodb.com/try/download/community
    echo.
)
echo.

echo [3/5] Installing backend dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
echo Backend dependencies installed successfully.
echo.

echo [4/5] Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..
echo Frontend dependencies installed successfully.
echo.

echo [5/5] Setup complete!
echo.
echo ==========================================
echo Next Steps:
echo ==========================================
echo 1. Make sure MongoDB is running
echo 2. Update the .env file with your configuration
echo 3. Run 'npm run dev' to start the application
echo 4. Open http://localhost:3000 in your browser
echo ==========================================
echo.
pause
