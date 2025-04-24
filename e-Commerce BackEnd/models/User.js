import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cardItems: {
        type: Object,
        default: {},
    },

}, {
    minimize: false, // Disable minimization of empty objects
})

const User =mongoose.models.User || mongoose.model("User", userSchema);
export default User;