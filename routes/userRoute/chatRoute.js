import express from "express";
const chatRoute = express.Router();;
import {getAllUsers} from "../../controllers/chatController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

chatRoute.get("/getAllUsers", isAuthenticated, getAllUsers);


export default chatRoute;