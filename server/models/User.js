import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        lastname: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 5
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: []
        },
        location: {
            type: String
        },
        occupation: {
            type: String
        },
        viewedProfile: {
            type: Number
        },
        impressions: {
            type: Number
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User",UserSchema);
export default User;