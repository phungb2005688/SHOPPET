import express from 'express';
const router = express.Router();
import {
    addToCart,
    updateCartItem,
    removeFromCart,
    getCart
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

// Route để lấy thông tin giỏ hàng của người dùng
router.route('/').get(protect, getCart);

// Route để thêm một sản phẩm vào giỏ hàng
router.route('/add').post(protect, addToCart);

// Route để cập nhật số lượng sản phẩm trong giỏ hàng
router.route('/update/:productId').put(protect, updateCartItem);

// Route để xóa một sản phẩm khỏi giỏ hàng
router.route('/remove/:productId').delete( protect, removeFromCart);

export default router;
