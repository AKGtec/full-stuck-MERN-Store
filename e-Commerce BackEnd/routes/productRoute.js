

import express from "express"; // Importing express framework
import { addProduct, changeStock, productById, productList } from "../controllers/productController.js";
import authSeller from "../middlewares/authSeller.js";
import { upload } from "../configs/multer.js";

const productRouter = express.Router();

productRouter.post("/add",upload.array(["images"]),authSeller,addProduct); // Route to add a new product
productRouter.get("/list",productList); // Route to get a list of all products
productRouter.get("/id",productById); // Route to get a list of all products
productRouter.post("/stock",authSeller,changeStock); // Route to get a list of all products

export default productRouter; // Export the product router for use in other files