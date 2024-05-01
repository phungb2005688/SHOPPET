import express from 'express';
const router = express.Router();
import {
  addContact,
  getMyContacts,
  getContactById,
  updateContactStatus,
  getContacts,
  deleteContact,
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addContact).get(protect, admin, getContacts);
router.route('/mine').get(protect, getMyContacts);
router.route('/:id').get(protect, getContactById);
// router.route('/:id/pay').put(protect, updateOrderToPaid);
router
  .route('/:id')
  .put(protect, admin, updateContactStatus)
  .delete(protect, admin, deleteContact);

export default router;
