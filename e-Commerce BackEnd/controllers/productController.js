
import {v2 as cloudinary} from "cloudinary"; // Import the Cloudinary library for image uploading
import Product from "../models/Product.js";
// add product controller :/api/product/add
export const addProduct = async (req, res) => {

    try {
        let productdata = JSON.parse(req.body.productData); // Parse the product data from the request body
        
        const images = req.files; // Get the images from the request files
       
        let imagesUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, {
                    resource_type: "image", // Specify the folder in Cloudinary
                });
                return result.secure_url; // Return the secure URL of the uploaded image
            })
        ) // Initialize an array to store image URLs
    
        await Product.create({...productdata, images: imagesUrl}); // Create a new product in the database with the provided data and image URLs
        res.json({ success: true, message: "Product added successfully" }); // Return success message
    } catch (error) {

        console.error("Error adding product:", error); // Log any errors
        res.json({ success: false, message: "Internal server error" }); // Return a 500 error response
        
    }
}


// get all products controller :/api/product/list
export const productList = async (req, res) => {

    try {
        const products = await Product.find({}); // Fetch all products from the database

        res.json({ success: true, products }); // Return success message and product list
    } catch (error) {
        
        console.error("Error fetching products:", error); // Log any errors
        res.json({ success: false, message: "Internal server error" }); // Return a 500 error response
    }
}

// get single product controller :/api/product/:id
export const productById = async (req, res) => {
    try {
        const { id } = req.body; // Get the product ID from the request body
        const product = await Product.findById(id); // Fetch the product by ID from the database
        res.json({ success: true, product }); // Return success message and product details

    } catch (error) {
        
        console.error("Error fetching product:", error); // Log any errors
        res.json({ success: false, message: "Internal server error" }); // Return a 500 error response
    }
}

// change product inStock controller :/api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body; // Get the product ID and inStock status from the request body
        const product = await Product.findByIdAndUpdate(id,{inStock}); // Update the inStock status of the product in the database
        res.json({ success: true, message: "Product stock updated successfully" }); // Return success message
    } catch (error) {
        
        console.error("Error updating product stock:", error); // Log any errors
        res.json({ success: false, message: "Internal server error" }); // Return a 500 error response
    }
}