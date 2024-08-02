// Backend/routes/QuizRoute.js

import express from 'express';
import { addQuiz, listQuizzes, removeQuiz } from '../controllers/QuizController.js';

const router = express.Router();

router.post('/add', addQuiz);
router.get('/list', listQuizzes);
router.post('/remove', removeQuiz);

export default router;
