import express from 'express';
import multer from 'multer';
import { addArticle, getAllArticles, getArticleById, updateArticle, deleteArticle } from '../controllers/Article.js';



const router = express.Router();

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})


router.post('/add', upload.single('image'), addArticle);
router.get('/get', getAllArticles);
router.get('/getById/:id', getArticleById);
router.put('/update/:id', upload.single('image'), updateArticle);
router.delete('/delete/:id', deleteArticle);

export default router;
