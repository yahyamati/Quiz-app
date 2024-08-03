// Backend/models/categoryModel.js

import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  image: { type: String, required: true } // Ensure this matches your schema definition
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
