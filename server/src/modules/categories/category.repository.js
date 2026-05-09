import Category from './category.model.js';

export const findAll = async (filters = {}, options = {}) => {
  const { sort = { createdAt: -1 } } = options;
  return await Category.find(filters).sort(sort);
};

export const findById = async (id) => {
  return await Category.findById(id);
};

export const create = async (categoryData) => {
  return await Category.create(categoryData);
};

export const updateById = async (id, updateData) => {
  return await Category.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteById = async (id) => {
  return await Category.findByIdAndDelete(id);
};
