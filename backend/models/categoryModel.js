import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
  {
    title: { type: String, required: [true, 'Please enter category name'] },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
