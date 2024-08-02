import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from 'validator'


//Login user

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Create token
        const token = createToken(user._id); 

        // Send response
        res.json({ success: true, message: "Login successful", token });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server error" });
    }
};



    const createToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET);
    };


    
    // Register user
    const registerUser = async (req, res) => {
        const { name, email, password } = req.body;
        try {
            // Check if user already exists
            const exists = await userModel.findOne({ email });
            if (exists) {
                return res.json({ success: false, message: "User already exists" });
            }
    
            // Validating email format & strong password
            if (!validator.isEmail(email)) {
                return res.json({ success: false, message: "Invalid email format" });
            } else if (password.length < 8) {
                return res.json({ success: false, message: "Password must be at least 8 characters" });
            }
    
            // Hashing user password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
    
            // Creating user
            const userCreate = new userModel({
                name: name,
                email: email,
                password: hashedPassword,
            });
    
            const user = await userCreate.save();
            const token = createToken(user._id);
            res.json({ success: true, message: "User created successfully", token });
    
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "ERROR" });
        }
    };


export {loginUser,registerUser};