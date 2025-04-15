import User from "../models/userSchema.js"
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtTokenGenerate.js";


export const registerUser = async (req , res)=>{
    const {name , email , password} = req.body
    if(!name || !email || !password){
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        })
    }
    //check if user already exists
    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }
    // hash password 
    const hashedPassword = await bcrypt.hash(password, 10);
    //create new user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })
    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: newUser
    })
}

export const loginUser = async (req , res)=>{
    const {email , password} = req.body
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        })
    }
    //check if user exists
    const user = await User.findOne({email}).select("+password")
    console.log("user" + user )
    if(!user){
        return res.status(400).json({
            success: false,
            message: "User does not exists"
        })
    }
    //check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        })
    }
    const token =  generateToken(user);

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
          }
    })
}

export const getUserDetails = async (req, res) => {
    try {
      const user = req.user; // comes from auth middleware
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.error("Get User Error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while fetching user details",
      });
    }
  };
  

export const logout = async (req, res) => {
    try {
      res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "strict",
        secure: true, // send secure cookies in production only
      });
  
      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      console.error("Logout Error:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong during logout",
      });
    }
  };
  