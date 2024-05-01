import express from 'express';
import {
  getStats,
  getAverageOrdersPerDay,
  getBestSellingProduct,
  getRevenueByCategory,
  getGrowthData,
  getMonthlyRevenue,
  getSpecificMonthRevenue,
  getTotalOrders,
  getTotalRevenue,
  getTotalUnpaidOrders,
} from '../controllers/statsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Định nghĩa route cho thống kê, bảo vệ bằng middleware xác thực và chỉ cho phép admin truy cập
router.route('/').get(protect, admin, getStats);

// Định nghĩa route cho thống kê đơn hàng trung bình mỗi ngày, có thể thêm bảo vệ nếu cần
router
  .route('/average-orders-per-day')
  .get(protect, admin, getAverageOrdersPerDay);

// sản phẩm bán chạy nhất
router.route('/best-selling').get(protect, admin, getBestSellingProduct);

// Tổng doanh thu
router.route('/total-revenue').get(protect, admin, getTotalRevenue);

// lấy thông tin doanh thu theo danh mục sản phẩm
router.route('/revenue-by-category').get(protect, admin, getRevenueByCategory);

// biểu đồ tăng trưởng
router.route('/growth').get(protect, admin, getGrowthData);

// Tất cả đơn hàng
router.route('/total-orders').get(protect, admin, getTotalOrders);

// Tất cả đơn hàng chưa thanh toán
router.route('/total-unpaid-orders').get(protect, admin, getTotalUnpaidOrders);

// doanh thu theo tháng
router.route('/monthly-revenue').get( protect, admin, getMonthlyRevenue);
// doanh thu theo tháng
router.route('/monthly-revenue/:year/:month').get(protect, admin, getSpecificMonthRevenue);

export default router;
