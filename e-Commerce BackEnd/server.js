import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import "dotenv/config.js"; // Load environment variables from .env file
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js'; // Import Cloudinary configuration
import productRouter from './routes/productRoute.js'; // Import productRouter
import cartRouter from './routes/cardRoute.js'; // Import cartRouter
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';


const app = express();
const port = process.env.PORT || 3000;

await connectDB(); // Connect to MongoDB
await connectCloudinary(); // Connect to Cloudinary



const allowedOrigins = ["http://localhost:3001"]; // Define your allowed origins here

// Middleware configuration

app.use(express.json()); // Parse JSON bodies
app.use(cookieParser());// Parse cookie headers
app.use(cors({origin: allowedOrigins, Credential:true})); // Enable CORS for all routes

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/user', userRouter); // Use userRouter for user-related routes
app.use('/api/seller',sellerRouter); // Use sellerRouter for seller-related routes
app.use('/api/product',productRouter); // Use productRouter for product-related routes
app.use('/api/card',cartRouter); // Use cardRouter for card-related routes
app.use('/api/address',addressRouter); // Use addressRouter for address-related routes
app.use('/api/order',orderRouter); // Use orderRouter for order-related routes

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});