import jwt from 'jsonwebtoken';

const generateUserToken = (res, userId) => {
  const userToken = jwt.sign({ userId }, process.env.USER_JWT_SECRET, {
    expiresIn: '30d',
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie('jwtuser', userToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

const generateAdminToken = (res, userId) => {
  const adminToken = jwt.sign({ userId }, process.env.ADMIN_JWT_SECRET, {
    expiresIn: '30d',
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie('adminJwt', adminToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
export { generateUserToken, generateAdminToken };
