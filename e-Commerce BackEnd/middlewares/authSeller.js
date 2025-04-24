import jwt from "jsonwebtoken"; // Import the jsonwebtoken library

const authSeller = (req, res, next) => {
    const {sellertoken} = req.cookies; // Get the token from cookies
    if (!sellertoken) {
        return res.json({ success: false, message: "Unauthorized" }); // If no token, return unauthorized error
    }
    try { 
            const decoded = jwt.verify(sellertoken, process.env.JWT_SECRET); // Verify the token
            if(decoded.email===process.env.SELLER_EMAIL){
                next();// Proceed to the next middleware or route handler
            }
            else {  
                return res.status.json({ success: false, message: "Unauthorized" }); // If token is invalid, return unauthorized error 
                 } 
    
        } catch (error) {
            console.error("Authentication error:", error); // Log any errors
            return res.status(401).json({ success: false, message: "authorized error" }); // Return unauthorized error
        }
}
export default authSeller; // Export the authSeller middleware for use in other files