import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../../../models/User.js';

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

export const registerUser = async (data) => {
  const userExists = await User.findOne({ email: data.email });
  if (userExists) {
    const error = new Error('User already exists');
    error.statusCode = 400;
    throw error;
  }
  return await User.create(data);
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return user;
  }
  const error = new Error('Invalid email or password');
  error.statusCode = 401;
  throw error;
};

export const generatePasswordResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save();
  return { resetToken, user };
};

export const resetPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    const error = new Error('Invalid or expired token');
    error.statusCode = 400;
    throw error;
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
  return user;
};
