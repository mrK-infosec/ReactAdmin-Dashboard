import * as categoryService from './category.service.js';
import { catchAsync } from '../../core/utils/catchAsync.js';

export const getCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  
  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: { categories }
  });
});

export const createCategory = catchAsync(async (req, res) => {
  const newCategory = await categoryService.createCategory(req.body);
  
  res.status(201).json({
    status: 'success',
    data: { category: newCategory }
  });
});

export const updateCategoryStatus = catchAsync(async (req, res) => {
  const updatedCategory = await categoryService.updateCategoryStatus(req.params.id, req.body.status);
  
  res.status(200).json({
    status: 'success',
    data: { category: updatedCategory }
  });
});

export const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  
  res.status(200).json({
    status: 'success',
    message: 'Category successfully deleted',
    data: null
  });
});
