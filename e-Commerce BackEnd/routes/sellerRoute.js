
import express from "express";
import { isSellerAuth, sellerLogin, sellerLogout } from "../controllers/sellerController.js";
import authSeller from "../middlewares/authSeller.js";

const sellerRouter = express.Router();

sellerRouter.post("/login", sellerLogin); // Route for seller login
sellerRouter.get("/is-auth",authSeller, isSellerAuth); // Route to check if seller is authenticated
sellerRouter.get("/logout", sellerLogout); // Route for seller logout

export default sellerRouter; // Export the seller router for use in other files