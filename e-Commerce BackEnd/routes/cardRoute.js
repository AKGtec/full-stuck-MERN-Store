import express from "express"; // Import express for creating a router
import authUser from "../middlewares/authUser.js";
import { updateCard } from "../controllers/cardController.js";

const cartRouter = express.Router(); // Create a new router instance

cartRouter.post("/update", authUser, updateCard);
export default cartRouter; // Export the router for use in other files