import express from "express"
import cors from "cors"
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js"
import userRouter from "./routes/UserRoute.js"
import quizRoutes from './routes/QuizRoute.js';



//app config
const app = express()
const port = 4000 //my port



//middleware
app.use(express.json()) //we can parsing to json 
app.use(cors()) //we can access backend for any frontend



//api endpoint
app.use('/api/user',userRouter);
app.use('/api/quiz', quizRoutes);
app.use("/images",express.static('uploads'));



// db connection 
connectDB();



app.get("/",(req,res)=>{
    res.send("API Working")

})



app.listen(port , ()=> {
    console.log(`Server is running on http://localhost:${port}`)
})