import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser'
import { db } from './config/db.config.js';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
import setupSocket from './config/socket.js';

//importing the routes
import userRoute from "./routes/userRoute/userRoute.js";
import chatRoute from './routes/userRoute/chatRoute.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware to log every incoming request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

//middlewares
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://10.0.2.2:5000", "http://localhost:8081"],
  credentials: true
}));

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);

app.get("/", (req, res) => {
  res.send("akash");
});

//socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
setupSocket(io);

// connect to DB
db();

// start the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
