import mongoose from 'mongoose';

const brandSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, 'Please enter brand name'] },

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

const Brand = mongoose.model('Brand', brandSchema);

export default Brand;
