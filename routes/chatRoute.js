import express from "express";
const chatRoute = express.Router();;
import {getAllUsers, messageHistory} from "../controllers/chatController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

chatRoute.get("/getAllUsers", isAuthenticated, getAllUsers);

chatRoute.get("/messages/:userId/:otherUserId" , messageHistory)


export default chatRoute;