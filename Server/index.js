import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { establishConnection } from './config/DbConfig.js';
import bookingRouter from './router/BookingRouter.js';

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended:false}));

app.use('/bookings', bookingRouter);

app.listen(process.env.PORT,()=>{
    console.log('Server is running on port ' + process.env.PORT);
    establishConnection();
});