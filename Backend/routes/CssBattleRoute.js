import express from 'express';
import { createDesign,getDesigns,getDesignById } from '../controllers/CssBattleController.js';
import { upload } from '../config/cloudinary.js'; // Adjust path as necessary




const Cssrouter = express.Router();




Cssrouter.post('/add',upload.single('image'), createDesign);
// Route to get all designs
Cssrouter.get('/getall', getDesigns);
// Route to get a design by ID
Cssrouter.get('/:id', getDesignById);


export default Cssrouter;