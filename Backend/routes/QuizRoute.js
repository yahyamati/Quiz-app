
import express from 'express';
import { addQuiz, listQuizzes, removeQuiz,addCategory, listCategories } from '../controllers/QuizController.js';
import multer from "multer"

const router = express.Router();



//image storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})


router.post("/addCategory",upload.single("image"),addCategory);
router.get("/listCategory",listCategories);
router.post('/add', addQuiz);
router.get('/list', listQuizzes);
router.post('/remove', removeQuiz);

export default router;
