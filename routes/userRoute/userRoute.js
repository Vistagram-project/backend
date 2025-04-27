import { Router } from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getUserDetails, loginUser, logout, registerUser } from "../../controllers/userController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const userRoute = Router();

// Use memory storage instead of disk storage
const storage = multer.memoryStorage(); // <- THIS IS THE CHANGE

const upload = multer({ storage: storage });

// routes
userRoute.post("/register", upload.single('file'), registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/getUserDetails", isAuthenticated, getUserDetails);
userRoute.get("/logout", logout);

export default userRoute;
