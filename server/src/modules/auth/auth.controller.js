import * as authService from './auth.service.js';
import { catchAsync } from '../../core/utils/catchAsync.js';

const sendTokenResponse = (user, statusCode, res) => {
  const token = authService.generateToken(user._id);

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  };

  res
    .status(statusCode)
    .cookie('jwt', token, options)
    .json({
      status: 'success',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      }
    });
};

export const register = catchAsync(async (req, res) => {
  const user = await authService.registerUser(req.body);
  sendTokenResponse(user, 201, res);
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUser(email, password);
  sendTokenResponse(user, 200, res);
});

export const logout = catchAsync(async (req, res) => {
  res.cookie('jwt', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
});

export const forgotPassword = catchAsync(async (req, res) => {
  const { resetToken } = await authService.generatePasswordResetToken(req.body.email);
  
  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
  
  res.status(200).json({
    status: 'success',
    message: 'Password reset link generated',
    resetUrl,
    resetToken
  });
});

export const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.params.token, req.body.password);
  
  res.status(200).json({
    status: 'success',
    message: 'Password reset successful'
  });
});

export const getMe = catchAsync(async (req, res) => {
  // Uses authMiddleware
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user
    }
  });
});
