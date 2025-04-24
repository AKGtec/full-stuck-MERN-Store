

import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';

const orderRouter = express.Router(); // Create a new router instance

orderRouter.post('/cod',authUser,placeOrderCOD ) // Route for placing a Cash on Delivery (COD) order

orderRouter.get('/user',authUser,getUserOrders ) // Route for getting user orders
orderRouter.get('/seller',authSeller,getAllOrders ) // Route for getting all orders for a seller

export default orderRouter; // Export the router for use in other files
