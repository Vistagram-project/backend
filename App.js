import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser'
import { db } from './config/db.config.js';
//importing the routes
import userRoute from "./routes/userRoute/userRoute.js";

dotenv.config();
const app = express();

//declaring the port
const PORT = process.env.PORT || 5000;

//using the middlewares
app.use(express.json({ limit: "1000mb" }));
app.use(cookieParser());
app.use(
  cors({
    allowedOrigins: ["http://10.0.2.2:5000", "http://localhost:3000"],
  })
);



//using the routes
app.use("/api/v1/user", userRoute);


app.get("/", (req, res)=>{
    res.send("akash")
})

db();

app.listen(PORT, ()=>{
    console.log(`new connection establish on PORT ${PORT} `)
})
