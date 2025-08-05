import React, { useContext, useEffect, useState } from 'react'


import RecipeCard from './RecipeCard';
import { Context } from './Context';
export default function MyRecipe() {

 
const [Recipes, setRecipes] = useState([]);

      const handleFetchRecipes = async() => {  
          try {
              const response =await fetch('http://localhost:5000/recipes'); // Replace with your API endpoint
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
      
     const name= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : null
     const filteredRecipes = Recipes.filter(recipe => recipe.createdBy === name.toLowerCase());  
      
       
        
    
  return (
    <section className="featured-section">
  {filteredRecipes && filteredRecipes.length > 0 ? (
    <>
      <h2> My Recipes</h2>
      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => (
         <RecipeCard 
            key={recipe._id}
            recipe={recipe}
            setRecipes={setRecipes}
            showBtn={true}
            
          />
        ))}
      </div>
    </>
  ) : (
    <h2 style={{
  textAlign: 'center',
  marginTop: 'auto',
  fontSize: 'clamp(1.5rem, 2vw + 1rem, 3rem)'
}}>Recipe not found</h2>
  )}
</section>

  )
}
