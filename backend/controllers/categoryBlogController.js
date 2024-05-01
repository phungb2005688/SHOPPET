import asyncHandler from '../middleware/asyncHandler.js';
import CategoryBlog from './../models/categoryBlogModel.js';

const createCategoryBlog = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const categoryblog = new CategoryBlog({
    title,
    user: req.user._id,
  });

  const createdCategoryBlog = await categoryblog.save();
  res.status(201).json(createdCategoryBlog);
});

const getCategoriesBlog = asyncHandler(async (req, res) => {
  const categoriesblog = await CategoryBlog.find({});
  res.json(categoriesblog);
});

const getCategoryBlogById = asyncHandler(async (req, res) => {

  const categoryblog = await CategoryBlog.findById(req.params.id);
  if (categoryblog) {
    return res.json(categoryblog);
  } else {
    res.status(404);
    throw new Error('Blog category not found');
  }
});
// @desc    Update a brand
// @route   PUT /api/brands/:id
// @access  Private/Admin
const updateCategoryBlog = asyncHandler(async (req, res) => {
  const { title } = req.body; // Sử dụng title thay vì name nếu mô hình dữ liệu sử dụng title

  const categoryblog = await CategoryBlog.findById(req.params.id);

  if (categoryblog) {
    categoryblog.title = title;

    const updatedCategoryBlog = await categoryblog.save();
    res.json(updatedCategoryBlog);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});


const deleteCategoryBlog = asyncHandler(async (req, res) => {
  const categoryblog = await CategoryBlog.findById(req.params.id);

  if (categoryblog) {
    await CategoryBlog.deleteOne({ _id: categoryblog._id });
    res.json({ message: 'Blog category removed' });
  } else {
    res.status(404);
    throw new Error('BLog category not found');
  }
});

const getTopCategoriesBlog = asyncHandler(async (req, res) => {
  const categoriesblog = await CategoryBlog.find({}).sort({ rating: -1 }).limit(3);

  res.json(categoriesblog);
});
export {
  createCategoryBlog,
  getCategoriesBlog,
  getCategoryBlogById,
  updateCategoryBlog,
  deleteCategoryBlog,
  getTopCategoriesBlog,
};
