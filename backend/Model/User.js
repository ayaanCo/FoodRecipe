import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // optional: removes extra spaces
    },
    email: {
        type: String,
        required: true,
        unique: true, // ensures no duplicate emails
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    avatar: {
        type: String,
        default: "https://example.com/default-avatar.png" // optional profile image
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
    type: String,
    enum: ['user', 'admin'], // only allow these values
    default: 'user',         // default is normal user
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default  User;
