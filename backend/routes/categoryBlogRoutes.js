import express from 'express';
const router = express.Router();
import {
  createCategoryBlog,
  getCategoriesBlog,
  getCategoryBlogById,
  updateCategoryBlog,
  deleteCategoryBlog,
  getTopCategoriesBlog,
} from '../controllers/categoryBlogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getCategoriesBlog).post(protect, admin, createCategoryBlog);
// router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
router.get('/top', getTopCategoriesBlog);
router
  .route('/:id')
  .get(checkObjectId, getCategoryBlogById)
  .put(protect, admin, checkObjectId, updateCategoryBlog)
  .delete(protect, admin, checkObjectId, deleteCategoryBlog);

export default router;
