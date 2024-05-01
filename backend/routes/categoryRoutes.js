import express from 'express';
const router = express.Router();
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getTopCategories,
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getCategories).post(protect, admin, createCategory);
// router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
router.get('/top', getTopCategories);
router
  .route('/:id')
  .get(checkObjectId, getCategoryById)
  .put(protect, admin, checkObjectId, updateCategory)
  .delete(protect, admin, checkObjectId, deleteCategory);

export default router;
