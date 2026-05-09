import * as categoryRepo from './category.repository.js';
import { AppError } from '../../core/errors/AppError.js';

export const getAllCategories = async () => {
  return await categoryRepo.findAll();
};

export const createCategory = async (categoryData) => {
  const existing = await categoryRepo.findAll({ name: categoryData.name });
  if (existing.length > 0) {
    throw new AppError('Category with this name already exists', 409);
  }
  return await categoryRepo.create(categoryData);
};

export const updateCategoryStatus = async (id, status) => {
  const category = await categoryRepo.findById(id);
  if (!category) {
    throw new AppError('Category not found', 404);
  }
  
  return await categoryRepo.updateById(id, { status });
};

export const deleteCategory = async (id) => {
  const category = await categoryRepo.findById(id);
  if (!category) {
    throw new AppError('Category not found', 404);
  }

  // Ideally, also check if products are attached to this category before deleting
  await categoryRepo.deleteById(id);
};
