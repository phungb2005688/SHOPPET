import asyncHandler from '../middleware/asyncHandler.js';
import Category from './../models/categoryModel.js';

const createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const category = new Category({
    title,
    user: req.user._id,
  });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

const getCategoryById = asyncHandler(async (req, res) => {

  const category = await Category.findById(req.params.id);
  if (category) {
    return res.json(category);
  } else {

    res.status(404);
    throw new Error('Category not found');
  }
});
// @desc    Update a brand
// @route   PUT /api/brands/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { title } = req.body; // Sử dụng title thay vì name nếu mô hình dữ liệu sử dụng title

  const category = await Category.findById(req.params.id);

  if (category) {
    category.title = title;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});


const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await Category.deleteOne({ _id: category._id });
    res.json({ message: 'Category removed' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

const getTopCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).sort({ rating: -1 }).limit(3);

  res.json(categories);
});
export {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getTopCategories,
};
