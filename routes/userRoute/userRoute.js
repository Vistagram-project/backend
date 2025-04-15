import e, { Router } from "express";
import { getUserDetails, loginUser, logout, registerUser } from "../../controllers/userController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const userRoute = Router();

// routes
userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/getUserDetails", isAuthenticated, getUserDetails );
userRoute.get("/logout" , logout)



export default userRoute;