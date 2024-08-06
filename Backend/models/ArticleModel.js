import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
    Question: { type: String, required: true },
    text1: { type: String, required: false },
    image: { type: String, required: false },
    text2: { type: String, required: false },
    liText: [{ type: String, required: false }],
    text3: { type: String, required: false },
    category1: { type: String, required: true },
    category2: { type: String, required: true }
});

const Article = mongoose.model('Article', ArticleSchema);

export default Article;


