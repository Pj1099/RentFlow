# Database Seeding Guide

This guide explains how to populate your Rental Management System database with sample data including users and products.

## 📦 What Gets Seeded

### Users (9 total)
1. **Admin User**
   - Email: admin@rentalapp.com
   - Password: admin123
   - Role: Admin
   - Full system access

2. **Vendor Users (5)**
   - **TechGear Rentals** - vendor1@rentalapp.com (password: vendor123)
   - **EventPro Equipment** - vendor2@rentalapp.com (password: vendor123)
   - **Outdoor Adventures** - vendor3@rentalapp.com (password: vendor123)
   - **Party Supplies Co** - vendor4@rentalapp.com (password: vendor123)
   - **Construction Tools Hub** - vendor5@rentalapp.com (password: vendor123)

3. **Customer Users (3)**
   - John Customer - customer1@example.com (password: customer123)
   - Sarah Williams - customer2@example.com (password: customer123)
   - Mike Johnson - customer3@example.com (password: customer123)

### Products (48 total)

#### Categories:
- **Electronics** (8 products): Cameras, Laptops, Drones, Tablets, Action Cameras
- **Event Equipment** (8 products): Projectors, Speakers, Microphones, Lighting, Tables, Chairs, Photo Booths
- **Outdoor & Sports** (8 products): Tents, Bikes, Paddleboards, Kayaks, Generators, Grills, Coolers
- **Party Supplies** (8 products): Bounce Houses, Popcorn Machines, Cotton Candy Machines, Fog Machines, Party Tents
- **Tools & Equipment** (8 products): Concrete Mixers, Tile Saws, Pressure Washers, Floor Sanders, Chainsaws, Scaffolding
- **Transportation** (1 product): Electric Scooters
- **Entertainment** (3 products): Gaming Consoles, VR Headsets, Smart TVs
- **Furniture** (2 products): Standing Desks, Office Chairs
- **Professional Equipment** (2 products): Video Production Kits, Podcast Kits

### Product Features:
- Multiple high-quality images (4 per product)
- Detailed specifications (brand, model, condition, weight, dimensions)
- Flexible rental pricing (hourly, daily, weekly)
- Product ratings and review counts
- Tags for easy searching
- Real product descriptions
- Availability tracking

## 🚀 How to Seed the Database

### Method 1: Using NPM Script (Recommended)
```bash
npm run seed
```

### Method 2: Direct Execution
```bash
node backend/seedData.js
```

## ⚠️ Important Notes

1. **Existing Data**: The seed script will **DELETE ALL EXISTING DATA** from:
   - Users collection
   - Products collection
   
   Make sure you have backups if needed!

2. **MongoDB Connection**: Ensure MongoDB is running and the connection string in `.env` is correct.

3. **Environment Variables**: The script uses `MONGO_URI` from your `.env` file. Default: `mongodb://localhost:27017/rental-app`

4. **Images**: The seed data uses placeholder images from Unsplash. These are real, high-quality images that work great for demo purposes.

## 📋 After Seeding

### Test the Application:

1. **Login as Admin:**
   ```
   Email: admin@rentalapp.com
   Password: admin123
   ```
   - View all users
   - Access admin dashboard
   - Manage system settings

2. **Login as Vendor:**
   ```
   Email: vendor1@rentalapp.com
   Password: vendor123
   ```
   - View your products
   - Manage orders
   - Check revenue statistics

3. **Login as Customer:**
   ```
   Email: customer1@example.com
   Password: customer123
   ```
   - Browse products
   - Create quotations
   - Place orders
   - View invoices

### Verify Data:

1. **Check Products:**
   - Navigate to `/products`
   - Should see 48 products across multiple categories
   - Click on any product to see detailed view with images

2. **Check User Dashboards:**
   - Each role (Admin, Vendor, Customer) has a different dashboard
   - Verify role-specific features are working

3. **Test Product Features:**
   - Product images gallery
   - Rental date picker
   - Availability checking
   - Add to cart functionality

## 🎨 Product Highlights

### High-End Products:
- Canon EOS R5 Camera (₹400/day)
- DJI Mavic 3 Pro Drone (₹450/day)
- MacBook Pro 16" M2 (₹180/day)
- Professional DSLR Video Kit (₹600/day)

### Budget-Friendly:
- Folding Tables (₹30/day)
- Chiavari Chairs (₹15/day)
- Portable Grill (₹30/day)
- Coolers (₹20/day)

### Popular Categories:
1. **Electronics**: Perfect for photographers, videographers, content creators
2. **Event Equipment**: Ideal for weddings, conferences, parties
3. **Outdoor & Sports**: Great for adventures, camping, beach trips
4. **Party Supplies**: Fun additions for any celebration
5. **Tools & Equipment**: Essential for contractors and DIY projects

## 🔧 Customization

### To modify the seed data:

1. Open `backend/seedData.js`
2. Edit the `sampleUsers` array to add/modify users
3. Edit the `sampleProducts` array to add/modify products
4. Run `npm run seed` again

### Adding More Products:

```javascript
{
  name: 'Product Name',
  description: 'Detailed description',
  category: 'Category Name',
  quantityOnHand: 10,
  costPrice: 100,
  salesPrice: 150,
  rentalPricing: { 
    hourly: 10, 
    daily: 80, 
    weekly: 500 
  },
  images: formatImages([
    'https://image-url-1.jpg',
    'https://image-url-2.jpg',
    'https://image-url-3.jpg',
    'https://image-url-4.jpg'
  ]),
  specifications: {
    brand: 'Brand Name',
    model: 'Model Number',
    condition: 'new', // or 'like-new', 'good', 'fair'
    weight: '5kg',
    color: 'Black'
  },
  tags: ['tag1', 'tag2', 'tag3'],
  ratings: { average: 4.5, count: 100 }
}
```

## 📊 Database Statistics

After seeding, your database will contain:
- **9 Users** (1 Admin, 5 Vendors, 3 Customers)
- **48 Products** across 9 categories
- **192 Product Images** (4 per product)
- **Every product** has specifications, ratings, and tags

## 🎯 Use Cases

This seed data is perfect for:
- **Development**: Test all features with realistic data
- **Demo**: Show clients how the system works
- **Testing**: Verify rental flow, availability, pricing
- **Training**: Teach users how to use the system
- **Presentations**: Showcase the application's capabilities

## 🐛 Troubleshooting

### Issue: "MongoDB connection error"
**Solution**: 
- Check if MongoDB is running: `mongod --version`
- Verify connection string in `.env` file
- Start MongoDB: `mongod` or use MongoDB Compass

### Issue: "Cannot find module"
**Solution**: 
- Run `npm install` in the root directory
- Make sure all dependencies are installed

### Issue: "Duplicate key error"
**Solution**:
- The script already clears existing data
- If you still get errors, manually drop collections:
  ```javascript
  // In MongoDB shell
  db.users.drop()
  db.products.drop()
  ```

### Issue: "Images not loading"
**Solution**:
- Unsplash images require internet connection
- Replace with your own image URLs if needed
- Check browser console for image loading errors

## 📝 Notes

- All passwords are hashed using bcrypt before storage
- GSTINs are sample values for demo purposes
- Product availability is automatically tracked
- Images use high-quality Unsplash photos
- Ratings and review counts are randomized realistic values

## 🎉 Ready to Test!

After seeding:
1. Start the application: `npm run dev`
2. Open browser: `http://localhost:3000`
3. Login with any of the sample credentials
4. Browse products, create orders, test all features!

Enjoy your fully populated Rental Management System! 🚀
