import jwt from "jsonwebtoken"; // Import jsonwebtoken for token verification

const authUser = async (req, res, next) => {
   

    const token = req.cookies.token; // Get the token from cookies
        if (!token) {
            return res.json({ success: false, message: "Unauthorized" }); // If no token, return unauthorized error
        }

    try {
        
             const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token 
             req.userId = decoded.id; // Attach user info to request object
             next();// Proceed to the next middleware or route handler

    } catch (error) {
        console.error("Authentication error:", error); // Log any errors
        return res.json({ success: false, message: "Unauthorized3" }); // Return unauthorized error
    }
}
export default authUser; // Export the authUser middleware for use in other files