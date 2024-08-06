
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  CategoryArticle: { type: String, required: true },
  image: { type: String, required: true } 
});

const CategoryArticle = mongoose.model('CategoryArticle', categorySchema);

export default CategoryArticle;
