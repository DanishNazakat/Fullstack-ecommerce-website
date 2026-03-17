const express = require('express');
require("dotenv").config();
const cookieParser = require("cookie-parser")
const cors = require('cors')
// const authMiddleware = require("./middleware/verifyToken")
const dbConnection = require('./db/dbconnection')
const app = express();
const userRouter = require('./router/userRoute');
const router = require('./router/route');
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Aapka frontend URL
    credentials: true
}));
// Limit ko 50mb tak badha dein taake images ja sakein
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api' , router)
app.use('/users', userRouter)
// app.use(authMiddleware);
dbConnection();
app.listen(process.env.PORT, ()=>{
    console.log(`server is running on PORT ${process.env.PORT}`);
})

