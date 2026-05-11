import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dimond-script')
  // .then(() => console.log('Connected to MongoDB for Seeding'))
  .catch((err) => {
    // console.error('Connection error', err);
    process.exit(1);
  });

const importData = async () => {
  try {
    // Clear all existing users (optional, remove if you want to keep data)
    // await User.deleteMany();

    // Check if admin exists to prevent duplicates
    const adminExists = await User.findOne({ email: 'admin@dimondscript.com' });
    
    if (adminExists) {
        // console.log('Admin user already exists!');
        process.exit();
    }

    const adminUser = new User({
      name: 'Super Admin',
      email: 'admin@dimondscript.com',
      password: 'password123',
      role: 'admin',
    });

    await adminUser.save();
    // console.log('Admin User Seeded Successfully: admin@dimondscript.com / password123');
    process.exit();
  } catch (error) {
    // console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
