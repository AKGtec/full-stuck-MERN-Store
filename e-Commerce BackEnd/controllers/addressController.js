import Address from "../models/Address.js";


// add adress controller :/api/address/add
export const addAddress = async (req, res) => {
    try {
        const { userId, address } = req.body; // Get userId and address from the request body
        await Address.create({...address,userId }); // Create a new address in the database with the provided data
        res.json({ success: true, message: "Address added successfully" }); // Return success message
    } catch (error) {
        
        console.error("Error adding address:", error); // Log any errors
        res.json({ success: false, message: "Internal server error" }); // Return a 500 error response
    }
}

// get address controller :/api/address/get

export const getAddress = async (req, res) => {
    try {
        const { userId } = req.body; // Get userId from the request body
        const addresses = await Address.find({ userId }); // Fetch all addresses for the user from the database
        res.json({ success: true, addresses }); // Return success message and address list
    } catch (error) {
        
        console.error("Error fetching addresses:", error); // Log any errors
        res.json({ success: false, message: "Internal server error" }); // Return a 500 error response
    }
}