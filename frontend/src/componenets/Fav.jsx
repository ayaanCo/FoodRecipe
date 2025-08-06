import React, { useContext, useEffect, useState } from 'react'
import { Context } from './Context';
import RecipeCard from './RecipeCard';

export default function Fav() {
 const [Recipes, setRecipes] = useState([])
   const handleFetchRecipes = async() => {  
            try {
                const response =await fetch('https://foodrecipe-rug5.onrender.com/recipes'); // Replace with your API endpoint
                if (!response.ok) { 
                    throw new Error('Network response was not ok');
                }
                const data =await response.json();
              setRecipes(data)
    
            }       
            catch (error) {
                console.error("Error fetching recipes:", error);
            }
        }
        useEffect(() => {
            handleFetchRecipes();   
        }, []);
       const user = JSON.parse(localStorage.getItem('user')); // Convert string to object
       const userId = user?._id; // Safe access using optional chaining

        const filteredRecipes = Recipes.filter(recipe => 
        recipe.likes.includes(userId));

        
  return (
     <section className="featured-section">
      {filteredRecipes && filteredRecipes.length > 0 ? (
        <>
          <h2>Your Favourite recipe</h2>
          <div className="recipe-grid">
            {filteredRecipes.map((recipe) => (
             <RecipeCard 
                key={recipe._id}
                recipe={recipe}
                setRecipes={setRecipes}
                showBtn={false}
                onUnlike={() => {
    setRecipes(prev => prev.filter(r => r._id !== recipe._id));
  }}
              />
            ))}
          </div>
        </>
      ) : (
        <h2 style={{
  textAlign: 'center',
  fontSize: 'clamp(1.5rem, 2vw + 1rem, 3rem)'
}}>Recipe not found</h2>
      )}
    </section>
  )
}
