import  { Router } from "express";
import express from "express"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getUserDetails, loginUser, logout, registerUser } from "../../controllers/userController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";
import path from "path";
import multer from "multer";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const userRoute = Router();
userRoute.use(express.static("public"));

// multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname , "../../public/images")); //Path to save the file
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
});
const upload = multer({ storage: storage });

// routes
userRoute.post("/register",upload.single('file') , registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/getUserDetails", isAuthenticated, getUserDetails );
userRoute.get("/logout" , logout)


export default userRoute;