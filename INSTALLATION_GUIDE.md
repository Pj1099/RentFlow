# Rental Management System - Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** (optional) - [Download here](https://git-scm.com/)

## Installation Steps

### 1. Install Dependencies

Open a terminal/command prompt in the project root directory and run:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Configure Environment Variables

The `.env` file in the root directory contains important configuration. Update these values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rental-management
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRE=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password
FRONTEND_URL=http://localhost:3000
```

**Important Notes:**
- Change `JWT_SECRET` to a random secure string
- For email functionality, use Gmail App Password (not your regular password)
- Keep MongoDB running on default port 27017

### 3. Start MongoDB

**Windows:**
```bash
# Start MongoDB service
net start MongoDB
```

**Mac/Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or if using Homebrew on Mac
brew services start mongodb-community
```

**Alternative:** You can use MongoDB Compass or MongoDB Atlas (cloud database)

### 4. Run the Application

You have two options to run the application:

#### Option A: Run Both (Recommended for Development)
```bash
# From root directory
npm run dev
```

This starts both backend (port 5000) and frontend (port 3000) simultaneously.

#### Option B: Run Separately

**Terminal 1 - Backend:**
```bash
npm start
# or
npm run server
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 5. Access the Application

Once running, open your browser and navigate to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api

## Default User Accounts

To get started quickly, you can create accounts through the registration page:

1. Go to http://localhost:3000/register
2. Create an account with the following roles:
   - **Customer:** For browsing and renting products
   - **Vendor:** For listing products and managing orders
   - **Admin:** Requires manual database update (see below)

### Creating an Admin User

Admins must be created manually:

1. Register a normal user first
2. Connect to MongoDB:
```bash
mongosh rental-management
```

3. Update the user role:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## Project Structure

```
rental-app/
├── backend/                # Node.js/Express backend
│   ├── controllers/        # Request handlers
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Auth & validation
│   └── server.js          # Entry point
├── frontend/              # React frontend
│   ├── public/           # Static files
│   └── src/
│       ├── components/   # Reusable components
│       ├── pages/        # Page components
│       ├── context/      # React Context
│       ├── utils/        # Utilities & API
│       └── App.js        # Main app component
├── .env                  # Environment variables
├── package.json          # Backend dependencies
└── README.md            # Documentation
```

## Key Features Implemented

✅ **Authentication & Authorization**
- JWT-based authentication
- Role-based access control (Customer, Vendor, Admin)
- Password encryption with bcrypt

✅ **Product Management**
- CRUD operations for products
- Flexible rental pricing (hourly, daily, weekly)
- Image upload support
- Inventory tracking
- Real-time availability checking

✅ **Rental Flow**
- Product browsing and search
- Shopping cart with rental dates
- Quotation generation
- Order creation with reservation
- Invoice generation
- Pickup and return tracking

✅ **Payment & Invoicing**
- Automated invoice generation
- Partial payment support
- Security deposit handling
- Late return fee calculation
- Payment tracking

✅ **Dashboards & Reports**
- Revenue analytics
- Order trends
- Product performance
- Vendor performance (Admin)
- Exportable reports

✅ **UI/UX**
- Professional dark blue and white theme
- Responsive design
- Clean and intuitive interface
- Toast notifications
- Loading states

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running. Start it using the commands in Step 3.

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change the PORT in `.env` file or stop the process using that port.

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:** Run `npm install` in the root directory and `npm install` in the frontend directory.

### CORS Errors
**Solution:** Ensure the backend server is running and the proxy is set correctly in `frontend/package.json`.

## Testing the Application

### 1. Test Customer Flow
1. Register as a customer
2. Browse products
3. Add items to cart with rental dates
4. Create quotation
5. Confirm and create order
6. View order status

### 2. Test Vendor Flow
1. Register as a vendor
2. Go to "My Products"
3. Add new products
4. View incoming orders
5. Update order status
6. Create invoices

### 3. Test Admin Flow
1. Create admin user (see above)
2. Login as admin
3. View all users
4. Manage products
5. View reports and analytics

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Vendor/Admin)
- `PUT /api/products/:id` - Update product (Vendor/Admin)
- `DELETE /api/products/:id` - Delete product (Vendor/Admin)

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status
- `PUT /api/orders/:id/cancel` - Cancel order

### Invoices
- `GET /api/invoices` - Get all invoices
- `POST /api/invoices` - Create invoice
- `POST /api/invoices/:id/payment` - Add payment

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/order-trends` - Get order trends
- `GET /api/dashboard/export` - Export reports

## Technology Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Nodemailer for emails

**Frontend:**
- React.js
- React Router for navigation
- Axios for API calls
- React Toastify for notifications
- Recharts for data visualization
- React Icons

## Production Deployment

### Backend Deployment (Example: Heroku)
1. Create a Heroku account
2. Install Heroku CLI
3. Create a new app
4. Set environment variables
5. Deploy:
```bash
git push heroku main
```

### Frontend Deployment (Example: Vercel/Netlify)
1. Build the frontend:
```bash
cd frontend
npm run build
```
2. Deploy the `build` folder to Vercel or Netlify

### Database (MongoDB Atlas)
1. Create a free cluster at mongodb.com/cloud/atlas
2. Get your connection string
3. Update `MONGODB_URI` in `.env`

## Support & Documentation

For more detailed documentation on specific features, refer to:
- Backend API documentation (coming soon)
- User guide (coming soon)
- Developer guide (coming soon)

## License

This project is created for educational purposes.

## Contributors

Built with ❤️ as a comprehensive MERN stack rental management solution.
