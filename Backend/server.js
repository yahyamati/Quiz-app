import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import userRouter from "./routes/UserRoute.js"
import quizRoutes from './routes/QuizRoute.js';
import articleRoutes from './routes/ArticleRoute.js';
import Quiz from "./models/QuizModel.js";



//app config
const app = express()
const port = process.env.PORT || 4000 ;//my port






//middleware
app.use(express.json()) //we can parsing to json 
app.use(cors()) //we can access backend for any frontend



//api endpoint
app.use('/api/user',userRouter);
app.use('/api/quiz', quizRoutes);
app.use('/api/articles', articleRoutes);
app.use("/images",express.static('uploads'));



// db connection 
connectDB();



app.get("/",(req,res)=>{
    res.send("API Working")

})
app.get('/api/quiz/list', async (req, res) => {
    const category = req.query.category;
    let filter = {};
    if (category) {
        filter = { category: category };
    }
    try {
        const quizzes = await Quiz.find(filter);
        res.json({
            success: true,
            data: quizzes
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});




app.listen(port , ()=> {
    console.log(`Server is running on http://localhost:${port}`)
})