import jwt from "jsonwebtoken"; // Import the jsonwebtoken library
import { trusted } from "mongoose";

// login controller :/api/seller/login

export const sellerLogin = async (req, res) => {
 try {
    const { email, password } = req.body; // Destructure email and password from request body
    if (!email || !password) {
        return res.json({ success: false, message: "All fields are required" }); // Check if all required fields are provided
    }
    if (email !== process.env.SELLER_EMAIL || password !== process.env.SELLER_PASSWORD) {
        return res.json({ success: false, message: "Invalid email or password" }); // If credentials are invalid, return an error message
    }  
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" }); // Generate an authentication token
    res.cookie("sellertoken", token, {
        httpOnly: true, // Make the cookie HTTP-only to prevent client-side access
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict", // Set SameSite attribute based on environment && csrf protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // Set cookie expiration to 7 days
    });
    return res.json({ success: true, message: "Seller login successfully" }); // Return success message
 } catch (error) {
    console.error("Error during login:", error); // Log any errors
        res.json({success:false, message: "Internal server error2" }); // Return a 500 error response
 }
}



// check auth controller :/api/seller/check-auth
export const isSellerAuth = async (req, res) => {
    try {
        const { sellertoken } = req.cookies; // Get the token from cookies
        if (!sellertoken) {
            return res.json({ success: false, message: "Unauthorized" }); // If no token, return unauthorized error
        }
        const decoded = jwt.verify(sellertoken, process.env.JWT_SECRET); // Verify the token
        if (decoded.email === process.env.SELLER_EMAIL) {
            return res.json({ success: true, message: "Seller is authenticated" }); // Return success message if authenticated
        } else {
            return res.status(401).json({ success: false, message: "Unauthorized" }); // If token is invalid, return unauthorized error 
        }
    } catch (error) {
        console.error("Authentication error:", error); // Log any errors
        return res.status(401).json({ success: false, message: "Unauthorized" }); // Return unauthorized error
    }
}


// logout controller :/api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("sellertoken"); // Clear the seller token cookie
        return res.json({ success: true, message: "Seller logged out successfully" }); // Return success message
    } catch (error) {
        console.error("Error during logout:", error); // Log any errors
        return res.status(500).json({ success: false, message: "Internal server error" }); // Return a 500 error response
    }
}