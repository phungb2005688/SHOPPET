import asyncHandler from '../middleware/asyncHandler.js';
import Blog from './../models/blogModel.js';

const createBlog = asyncHandler(async (req, res) => {
  const { title, image, category, description } = req.body;

  const blog = new Blog({
    title,
    user: req.user._id,
    image,
    category,
    description,
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const getBlogs = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Blog.countDocuments({ ...keyword });
  const blogs = await Blog.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ blogs, page, pages: Math.ceil(count / pageSize) });
});

// const getBlogs = asyncHandler(async (req, res) => {
//   const blogs = await Blog.find({});
//   res.json(blogs);
// });
// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {

  const blog = await Blog.findById(req.params.id);
  if (blog) {
    return res.json(blog);
  } else {

    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const { title, description, image, category } =
    req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title;
    blog.description = description;
    blog.image = image;
    blog.category = category;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await Blog.deleteOne({ _id: blog._id });
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});


// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).sort({ rating: -1 }).limit(3);

  res.json(blogs);
});

export {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getTopBlogs,
};
