import express from 'express';
import multer from 'multer';
import { addArticle, getAllArticles, getArticleById, updateArticle, deleteArticle, addCategoryArticle, listCategoriesArticle, removeCategoryArticle } from '../controllers/Article.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.post('/add', upload.single('image'), addArticle);
router.get('/get', getAllArticles);
router.get('/getById/:id', getArticleById);
router.put('/update/:id', upload.single('image'), updateArticle);
router.post('/remove', deleteArticle);
router.post('/addCategoryArticle', upload.single('image'), addCategoryArticle);
router.get('/listCategoryArticle', listCategoriesArticle);
router.post('/removeCategoryArticle', removeCategoryArticle);

export default router;
