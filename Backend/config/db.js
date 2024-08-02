import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://yahyamati8:yahya123@cluster0.2dw3dby.mongodb.net/Quiz-app').then(()=>console.log("DB Connected"));

}