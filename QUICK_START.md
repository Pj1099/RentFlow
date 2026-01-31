# 🚀 Quick Start Guide

## Getting Started in 5 Minutes

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Configure Environment
The `.env` file is already created. Make sure MongoDB is running.

### 3. Seed Database with Sample Data
```bash
npm run seed
```
This will create:
- 9 users (1 admin, 5 vendors, 3 customers)
- 48 products across multiple categories
- Sample data for testing

### 4. Start the Application
```bash
npm run dev
```

### 5. Access the Application
Open your browser and go to: **http://localhost:3000**

## 🔐 Login Credentials

### Admin Access
```
Email: admin@rentalapp.com
Password: admin123
```
**Features:**
- View all users and products
- Access system-wide analytics
- Manage vendors and customers
- System settings

### Vendor Access
```
Email: vendor1@rentalapp.com
Password: vendor123
```
**Features:**
- Manage your products
- View your orders
- Track revenue
- Process pickups and returns

**Other Vendors:**
- vendor2@rentalapp.com
- vendor3@rentalapp.com
- vendor4@rentalapp.com
- vendor5@rentalapp.com

### Customer Access
```
Email: customer1@example.com
Password: customer123
```
**Features:**
- Browse products
- Create quotations
- Place orders
- View invoices
- Track rentals

**Other Customers:**
- customer2@example.com
- customer3@example.com

*All vendor and customer passwords are: **customer123** or **vendor123***

## 📦 What's Included

### Products (48 total)
- **Electronics**: Cameras, Laptops, Drones, Tablets (8 products)
- **Event Equipment**: Projectors, Speakers, Lighting, Tables (8 products)
- **Outdoor & Sports**: Bikes, Tents, Kayaks, Camping gear (8 products)
- **Party Supplies**: Bounce houses, Karaoke, Food machines (8 products)
- **Tools & Equipment**: Power tools, Scaffolding, Construction (8 products)
- **Furniture**: Desks, Chairs (2 products)
- **Entertainment**: Gaming, VR, Smart TV (3 products)
- **Transportation**: Electric scooters (1 product)
- **Professional**: Video production, Podcasting (2 products)

### Features per Product
✅ Multiple high-quality images (4 per product)
✅ Detailed specifications
✅ Flexible pricing (hourly/daily/weekly)
✅ Ratings and reviews
✅ Tags for easy search
✅ Availability tracking

## 🎯 Test the Key Features

### As a Customer:
1. **Browse Products** → Go to "Products" page
2. **View Product Details** → Click on any product
3. **Select Rental Dates** → Choose start and end dates
4. **Add to Cart** → Click "Rent Now"
5. **Create Quotation** → Review and confirm
6. **Place Order** → Complete the rental process

### As a Vendor:
1. **Dashboard** → View your statistics
2. **Products** → See your product listings
3. **Orders** → Manage incoming orders
4. **Update Status** → Process pickups and returns

### As an Admin:
1. **Admin Dashboard** → View system-wide analytics
2. **Users** → Manage all users
3. **Products** → View all products
4. **Reports** → Generate system reports

## 🎨 UI Features

✨ **Dark Blue & White Theme** - Professional and clean
✨ **Responsive Design** - Works on mobile, tablet, desktop
✨ **Interactive Cards** - Smooth hover effects
✨ **Image Galleries** - Multiple product images
✨ **Date Pickers** - Easy rental period selection
✨ **Real-time Availability** - Check if products are available
✨ **Price Calculator** - Automatic price calculation with GST

## 📱 Pages Available

### Public Pages
- `/` - Home page with features
- `/products` - Browse all products
- `/products/:id` - Product details
- `/login` - User login
- `/register` - New user registration

### Protected Pages (After Login)
- `/dashboard` - Role-specific dashboard
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/orders` - Order history
- `/quotations` - Quotation management
- `/invoices` - Invoice viewing
- `/profile` - User profile

### Vendor Pages
- `/vendor/products` - Manage products
- `/vendor/orders` - Manage orders

### Admin Pages
- `/admin/dashboard` - Admin overview
- `/admin/users` - User management
- `/admin/settings` - System settings

## 🔧 Common Commands

```bash
# Install all dependencies
npm run install-all

# Seed database with sample data
npm run seed

# Start both backend and frontend
npm run dev

# Start only backend
npm run server

# Start only frontend
npm run client

# Production build
cd frontend && npm run build
```

## 🆘 Need Help?

### Application not starting?
- Check if MongoDB is running
- Verify ports 3000 and 5000 are available
- Run `npm install` again

### Can't login?
- Make sure you ran `npm run seed`
- Check MongoDB connection
- Verify credentials from this guide

### Products not showing?
- Run `npm run seed` to populate database
- Check browser console for errors
- Verify backend is running on port 5000

## 📚 Documentation

- **[INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)** - Detailed setup instructions
- **[SEED_DATA_GUIDE.md](SEED_DATA_GUIDE.md)** - Database seeding details
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete feature list
- **[README.md](README.md)** - Project overview

## 🎉 You're All Set!

The application is now ready to use with:
- ✅ 9 sample users
- ✅ 48 products with images
- ✅ Full rental workflow
- ✅ Professional UI
- ✅ All features working

**Start exploring and testing all features!** 🚀

---

💡 **Pro Tip**: Login as different user types to see how dashboards and features change based on roles!
