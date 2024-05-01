import express from 'express';
const router = express.Router();
import {
    createBrand,
    getBrands,
    getBrandById,
    updateBrand,
    deleteBrand,
    getTopBrands,
} from '../controllers/brandController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getBrands).post(protect, admin, createBrand);
// router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
router.get('/top', getTopBrands);
router
  .route('/:id')
  .get(checkObjectId, getBrandById)
  .put(protect, admin, checkObjectId, updateBrand)
  .delete(protect, admin, checkObjectId, deleteBrand);

export default router;
