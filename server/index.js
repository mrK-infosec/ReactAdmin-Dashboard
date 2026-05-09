import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import orderRoutes from './routes/orders.js';
import authRoutes from './routes/auth.js';
import newCategoryRoutes from './src/modules/categories/category.routes.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from './models/User.js';
import { errorHandler } from './src/core/middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', newCategoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Global Error Handler (MUST be the last middleware)
app.use(errorHandler);

// Start the server immediately
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Database Connection
const connectDB = async () => {
  try {
    // Try to connect to local MongoDB first (fast timeout)
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dimond-script', { serverSelectionTimeoutMS: 2000 });
    console.log('Connected to Local MongoDB successfully');
  } catch (err) {
    console.log('Local MongoDB not found. Starting In-Memory Database...');
    try {
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log('Connected to In-Memory MongoDB successfully! (Data will reset on restart)');
      
      // Auto-seed admin user for testing
      const adminExists = await User.findOne({ email: 'admin@dimondscript.com' });
      if (!adminExists) {
        await User.create({
          name: 'Super Admin',
          email: 'admin@dimondscript.com',
          password: 'password123',
          role: 'admin',
        });
        console.log('Test Admin Seeded: admin@dimondscript.com / password123');
      }
    } catch (memErr) {
      console.error('Failed to start In-Memory Database', memErr);
    }
  }
};

connectDB();
