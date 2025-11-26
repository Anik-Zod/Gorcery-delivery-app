import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import cookieParser from 'cookie-parser';
import homeRouter from './src/routes/home.route.js';
import sellerRouter from './src/routes/seller.route.js';
import ConnectCloudinary from './src/configs/cloudinary.js';

import authRouter from './src/routes/google.route.js';
import productRouter from './src/routes/product.route.js';
import cartRouter from './src/routes/cart.route.js';
import addressRouter from './src/routes/adress.route.js';
import orderRouter from './src/routes/order.route.js';
import { connectDB } from './db.js';
import passport from 'passport';
import './src/configs/auth/google.js'

dotenv.config();

const app = express();

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true,limit: '16kb' }));
app.use(cookieParser())

// Initialize Passport
app.use(passport.initialize());

app.use(express.static('public'));
app.use(helmet());
app.use(morgan('dev'))
app.use(cors({
  origin:['https://gorcery-delivery-app-pyq7.vercel.app','http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type','Authorization']
}))
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
  max:1000,
  message: 'Too many requests, please try again later.'
}))

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});
app.use('/auth', authRouter);
app.use('/user', homeRouter);
app.use('/seller', sellerRouter);
app.use('/product',productRouter)
app.use('/cart',cartRouter)
app.use('/address',addressRouter)
app.use('/order',orderRouter)


const startServer = async()=>{
  await connectDB();
  await ConnectCloudinary();
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer()