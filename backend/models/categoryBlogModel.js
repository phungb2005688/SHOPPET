import mongoose from 'mongoose';

const categoryBlogSchema = mongoose.Schema(
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

const CategoryBlog = mongoose.model('CategoryBlog', categoryBlogSchema);

export default CategoryBlog;
