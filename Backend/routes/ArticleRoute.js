import express from 'express';
import { upload } from '../config/cloudinary.js'; // Adjust path as necessary
import { addArticle, getAllArticles, getArticleById, deleteArticle, addCategoryArticle, listCategoriesArticle, removeCategoryArticle, listFiltredArticle } from '../controllers/Article.js';

const router = express.Router();




router.post('/add',upload.single('image'), addArticle);
router.get('/get', getAllArticles);
router.get('/getById/:id', getArticleById);
router.post('/remove', deleteArticle);
router.post('/addCategoryArticle', upload.single('image'), addCategoryArticle);
router.get('/listCategoryArticle', listCategoriesArticle);
router.post('/removeCategoryArticle', removeCategoryArticle);
router.get('/listFilArticle', listFiltredArticle);

export default router;
