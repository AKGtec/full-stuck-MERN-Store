

//Update user card : /api/card/update

import User from "../models/User.js";

export const updateCard = async (req, res) => {
    
    try {
        const { userId,cartItems } = req.body; // Get userId and cartItems from the request body
        await User.findByIdAndUpdate(userId, { cartItems }); // Update the user's cart items in the database
        res.json({ success: true, message: "Card updated successfully" }); // Return success message

    } catch (error) {
        
        console.error("Error updating card:", error); // Log any errors
        res.json({ success: false, message: "Internal server error" }); // Return a 500 error response
    }
}