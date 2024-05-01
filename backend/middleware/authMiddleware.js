import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let tokenName;

  // Kiểm tra cookie của quản trị viên
  let adminToken = req.cookies.adminJwt;
  if (adminToken) {
    tokenName = 'adminJwt';
  } else {
    // Nếu không có cookie quản trị viên, kiểm tra cookie của người dùng thông thường
    adminToken = req.cookies.userJwt;
    tokenName = 'jwtuser';
  }

  if (adminToken) {
    try {
      const decoded = jwt.verify(adminToken, process.env.ADMIN_JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      // Thêm một trường mới cho biết vai trò của người dùng
      req.user.isAdmin = tokenName === 'adminJwt';

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Không được ủy quyền, mã thông báo không thành công');
    }
  } else {
    res.status(401);
    throw new Error('Không được ủy quyền, không có mã thông báo');
  }
});

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
