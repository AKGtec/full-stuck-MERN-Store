

// place Order COD :    /api/order/cod

import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const placeOrderCOD = async (req, res) => {
    try {
        const { userId ,item , address}= req.body; // Get userId, item, and address from the request body
        if(!address,item.lenght ===0){
            return res.json({success:false,message:"Please add address and items"}); // Return error if address or items are not provided
        }
        // calculate Amount using the items
        let amount = await item.reduce(async (acc, item) => {
            const product = await Product.findById(item.product); // Fetch product details from the database using productId
            if (!product) {
                throw new Error("Product not found"); // Throw error if product is not found
            }
            return (await acc) + product.offerprice * item.quantity; // Calculate total amount based on product price and quantity
        },0)

        // add Tax to Amount (2%)
        amount += Math.floor(amount*0.02); // Add tax to the total amount


        const order = await Order.create({ // Create a new order in the database with the provided data
            userId,
            item,
            amount,
            address,
            paymentType: "COD",
        });
        res.json({ success: true, message: "Order placed successfully", order }); // Return success message and order details
    } catch (error) {
        
        console.error("Error placing order:", error); // Log any errors
        res.json({ success: false, message: "Internal server error" }); // Return a 500 error response
    }
}

// get orders by userId : /api/order/user

export const getUserOrders = async (req, res) => {
    try {
        const {userId}= req.body; // Get userId from the request body
        const orders = await Order.find({userId,$or:[{paymentType:"COD"},{isPaid:true}]}).populate("items.product address").sort({createdAt:-1}); 
        // Fetch all orders for the user from the database with payment type "COD" or isPaid status true and populate the items and address fields 

        if(!orders){
            return res.json({success:false,message:"No orders found"}); // Return error if no orders are found
        }
        if(!userId){
            return res.json({success:false,message:"Please add userId"}); // Return error if userId is not provided
        }
        res.json({ success: true, orders }); // Return success message and order list


    } catch (error) {
        
        console.error("Error fetching user orders:", error); // Log any errors
        res.json({ success: false, message: "Internal server error" }); // Return a 500 error response
    }
}

// get All orders for(seller/ admin) : /api/order/seller

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({$or:[{paymentType:"COD"},{isPaid:true}]}).populate("items.product address").sort({createdAt:-1}); 
        // Fetch all orders from the database with payment type "COD" or isPaid status true and populate the items and address fields
        if(!orders){
            return res.json({success:false,message:"No orders found"}); // Return error if no orders are found
        }
        res.json({ success: true, orders }); // Return success message and order list 


    } catch (error) {
        
        console.error("Error fetching all orders:", error); // Log any errors
        res.json({ success: false, message: "Internal server error" }); // Return a 500 error response
    }
}
