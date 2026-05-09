import { Router } from 'express';
import * as categoryController from './category.controller.js';
import { protect, admin } from '../../../middleware/authMiddleware.js';

const router = Router();

// Notice: In the future, we'll add validation middleware here (Phase 4)
router.route('/')
  .get(protect, categoryController.getCategories)
  .post(protect, admin, categoryController.createCategory);

router.route('/:id/status')
  .patch(protect, admin, categoryController.updateCategoryStatus);

router.route('/:id')
  .delete(protect, admin, categoryController.deleteCategory);

export default router;
