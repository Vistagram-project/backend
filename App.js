import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser'
import { db } from './config/db.config.js';
import bodyParser from 'body-parser';
//importing the routes
import userRoute from "./routes/userRoute/userRoute.js";
import chatRoute from './routes/userRoute/chatRoute.js';

dotenv.config();
const app = express();

//declaring the port
const PORT = process.env.PORT || 5000;

// Middleware to log every incoming request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

//using the middlewares
app.use(express.json({ limit: "1000mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    allowedOrigins: ["http://10.0.2.2:5000", "http://localhost:8081"],
  })
);



//using the routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);

app.get("/", (req, res)=>{
    res.send("akash")
})

db();

app.listen(PORT, ()=>{
    console.log(`new connection establish on PORT ${PORT} `)
})
