import express from 'express';
import dotenv from 'dotenv';
import cookieParser  from "cookieParser";

import authRoutes from './routes/auth.routes.js';
i

dotenv.config({
    path:'./.env'
});

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get("/",(req , res )=>{
    res.send("Hello from codeXperiment")
})

app.use("/api/vi/auth", authRoutes)

app.listen(process.env.PORT , () =>{
    console.log(" server is listning on port", process.env.PORT)
})

