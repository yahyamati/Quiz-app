import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
    text1: { type: String, required: true },
    image: { type: String, required: true },
    text2: { type: String, required: true },
    liText: [{ type: String, required: true }],
    text3: { type: String, required: true },
    category: { type: String, required: true }
});

const Article = mongoose.model('Article', ArticleSchema);

export default Article;
