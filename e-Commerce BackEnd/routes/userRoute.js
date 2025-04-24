import express from "express";
import { isAuth, login, logout, register } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", register); // Route for user registration
userRouter.post("/login", login); // Route for user login
userRouter.get("/is-auth",authUser,isAuth ); // Route to check if user is authenticated
userRouter.get("/logout",authUser,logout ); // Route for user logout

export default userRouter; // Export the user router for use in other files