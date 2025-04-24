

import express from 'express';
import { addAddress, getAddress } from '../controllers/addressController.js';
import authUser from '../middlewares/authUser.js';

const addressRouter = express.Router(); // Create a new router instance

addressRouter.post('/add',authUser,addAddress)
addressRouter.get('/get',authUser,getAddress)

export default addressRouter; // Export the router for use in other files