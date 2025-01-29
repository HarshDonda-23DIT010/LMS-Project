import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';
import courseRoute from './routes/course.route.js';
import mediaRoute from './routes/media.route.js';


dotenv.config();
const app= express();


//connect database here 
connectDB();

//defualt middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors(
   {
      origin: "http://localhost:5173",
      credentials: true
   }
));

//port
const PORT = process.env.PORT || 8080;

//Api routes
app.use('/api/v1/media', mediaRoute);
app.use('/api/v1/user' , userRoute)
app.use('/api/v1/course' , courseRoute)


app.listen(PORT , ( )=> {
   console.log(`Server is running on port ${PORT}`);
})