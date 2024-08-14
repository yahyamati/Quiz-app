import express from 'express';
import { addQuiz, listQuizzes, removeQuiz, addCategory, listCategories, listFiltredQuizzes, removeCategory } from '../controllers/QuizController.js';
import { upload } from '../config/cloudinary.js'; // Adjust path as necessary

const router = express.Router();

router.post('/addCategory', upload.single('image'), addCategory);
router.get('/listCategory', listCategories);
router.post('/add', addQuiz);
router.get('/list', listQuizzes);
router.get('/listFil', listFiltredQuizzes);
router.post('/remove', removeQuiz);
router.post('/removeCategory', removeCategory);

export default router;
