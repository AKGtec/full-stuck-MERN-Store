// Route: /api/user/register
import User from "../models/User.js";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation

export const register = async (req, res) => {
    try {
       const { name, email, password } = req.body;
       if (!name || !email || !password) {
            return res.json({success:false, message: "All fields are required" });
       } // Check if all required fields are provided
       const existingUser = await User.findOne({email}); // Check if user already exists
       
       if (existingUser) {
            return res.json({success:false, message: "User already exists" });
       } // If user exists, return an error message
       
       const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
       // Create a new user instance
        const user = new User({
            name,
            email,
            password: hashedPassword, // Store the hashed password
        });

        await user.save(); // Save the user to the database

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"}) // Generate an authentication token

        res.cookie("token", token, {
            httpOnly: true, // Make the cookie HTTP-only to prevent client-side access
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: process.env.NODE_ENV === "production" ? "None" : "strict", // Set SameSite attribute based on environment && csrf protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // Set cookie expiration to 7 days
        }); // Set the token as a cookie in the response
        
        return res.json({success:true,user:{email: user.email,name:user.name,}, message: "User registered successfully"}); // Return success message and user data
    }
    catch (error) {
        console.error("Error during registration:", error); // Log any errors
        res.json({success:false, message: "Internal server error" }); // Return a 500 error response
    }
}

//login controller :/api/user/login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body; // Destructure email and password from request body
        if (!email || !password) {
            return res.json({success:false, message: "All fields are required" }); // Check if all required fields are provided
        }
        const user = await User.findOne({email}); // Find user by email
        if (!user) {
            return res.json({success:false, message: "Invalid email or password" }); // If user not found, return an error message
        }
        const isPasswordValid = await bcrypt.compare(password, user.password); // Compare provided password with stored hashed password
        if (!isPasswordValid) {
            return res.json({success:false, message: "Invalid email or password" }); // If password is invalid, return an error message
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"}) // Generate an authentication token

        res.cookie("token", token, {
            httpOnly: true, // Make the cookie HTTP-only to prevent client-side access
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: process.env.NODE_ENV === "production" ? "None" : "strict", // Set SameSite attribute based on environment && csrf protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // Set cookie expiration to 7 days
        }); // Set the token as a cookie in the response    } catch (error) {
            return res.json({success:true,user:{email: user.email,name:user.name,}, message: "User login successfully"}); // Return success message and user data

    } catch (error) {
        console.error("Error during login:", error); // Log any errors
        res.json({success:false, message: "Internal server error2" }); // Return a 500 error response
    }
}


//check auth controller :/api/user/check-auth
export const isAuth = async (req, res) => {
    try {
        const userId = req.userId;  // Get userId from request body
        const user = await User.findById(userId).select("-password"); // Find user by ID
       return res.json({success:true,user}); // Return user data without password
     
    } catch (error) {
       console.error("Error during authentication check:", error); // Log any errors
       res.json({success:false, message: "Internal server error3" }); // Return a 500 error response  
    }
}

//logout controller :/api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token",{
            httpOnly: true, // Make the cookie HTTP-only to prevent client-side access
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: process.env.NODE_ENV === "production" ? "None" : "strict", // Set SameSite attribute based on environment && csrf protection
        }); // Clear the authentication token cookie
        return res.json({success:true, message: "User logged out successfully"}); // Return success message
    } catch (error) {
        console.error("Error during logout:", error); // Log any errors
        res.json({success:false, message: "Internal server error" }); // Return a 500 error response
    }
}