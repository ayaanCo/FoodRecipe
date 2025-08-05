import mongoose from "mongoose";

const connection = async () => {    
    await mongoose.connect(process.env.MONGO_URI )
        .then(() => console.log("MongoDB connected successfully"))
        .catch((error) => console.error("MongoDB connection error:", error));   
};
export default connection;