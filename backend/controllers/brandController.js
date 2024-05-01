import asyncHandler from '../middleware/asyncHandler.js';
import Brand from '../models/brandModel.js';

const createBrand = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const brand = new Brand({
    title,
    user: req.user._id,

  });

  const createdBrand = await brand.save();
  res.status(201).json(createdBrand);
});

const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({});
  res.json(brands);
});

const getBrandById = asyncHandler(async (req, res) => {

  const brand = await Brand.findById(req.params.id);
  if (brand) {
    return res.json(brand);
  } else {

    res.status(404);
    throw new Error('Brand not found');
  }
});
// @desc    Update a brand
// @route   PUT /api/brands/:id
// @access  Private/Admin
const updateBrand = asyncHandler(async (req, res) => {
  const { title } = req.body; // Sử dụng title thay vì name nếu mô hình dữ liệu sử dụng title

  const brand = await Brand.findById(req.params.id);

  if (brand) {
    brand.title = title;

    const updatedBrand = await brand.save();
    res.json(updatedBrand);
  } else {
    res.status(404);
    throw new Error('Brand not found');
  }
});
// const updateBrand = asyncHandler(async (req, res) => {
//   const { title } = req.body;

//   const brand = await Brand.findById(req.params.id);

//   if (brand) {
//     brand.title = title;

//     const updatedBrand = await brand.save();
//     res.json(updatedBrand);
//   } else {
//     res.status(404);
//     throw new Error('Brand not found');
//   }
// });

const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (brand) {
    await Brand.deleteOne({ _id: brand._id });
    res.json({ message: 'Brand removed' });
  } else {
    res.status(404);
    throw new Error('Brand not found');
  }
});

const getTopBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({}).sort({ rating: -1 }).limit(3);

  res.json(brands);
});
export {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
  getTopBrands,
};
