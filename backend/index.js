import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';    
import recipeRoutes from './Routes/Recipe.js';
import connection from './Connection/Recipe.js';

import userRoutes from './Routes/User.js'; // Ensure this path is correct
dotenv.config();
const app = express();

connection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",recipeRoutes);
app.use("/user", userRoutes); // Ensure userRoutes is imported correctly

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});