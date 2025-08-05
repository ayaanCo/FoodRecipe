import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,  
        required: true,
    },
    ingredients: {
        type: 
        [String],
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy:{
        type: String,
        required:true
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    duration:{
        type:String,
        required:true
    }
 
},{timestamps:true});
const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;