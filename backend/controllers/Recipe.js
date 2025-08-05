import mongoose from 'mongoose';
import Recipe from '../Model/Recipe.js';
import e from 'express';
export const getRecipes = async (req, res) => {
    try {
       
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes' });
    }
}
export const getRecipe= async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch a single recipe by ID
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    }catch (error) {
        res.status(500).json({ message: 'Error fetching recipe' });
    } 
}
export const deleteRecipe = async (req, res) => {
    const { id } = req.params;      
    try {
        // Delete
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe deleted successfully' });
    }catch(e){
        res.status(500).json({ message: 'Error deleting recipe' });
    }
}
export const updateRecipe = async (req, res) => {
    const { id } = req.params;  
    const { title, ingredients, instructions, image } = req.body;
    try {
        // Update recipe
        const updatedRecipe = await Recipe.findByIdAndUpdate(id,
            { title, ingredients, instructions, image },
            { new: true }
        );  
        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(updatedRecipe);
    } catch (error) {
         res.status(500).json({ message: 'Error deleting recipe' });
    }
}
export const createRecipe = async (req, res) => {
   
    const { title, ingredients, instructions, image , createdBy,duration } = req.body;
    try {
        // Create a new recipe
       
        const newRecipe = new Recipe({
            title,
            ingredients,
            instructions,
            image,
            duration,
            createdBy, // Ensure createdBy is an ObjectId
        });
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Error creating recipe' });
    }
}
