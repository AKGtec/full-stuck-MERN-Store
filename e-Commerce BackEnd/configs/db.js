import mongoose from "mongoose";


const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("MongoDB connected"));
        await mongoose.connect(`${process.env.MONGODB_URL}/myStore`);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
}
export default connectDB;