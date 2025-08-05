import React from 'react';
import { useLocation } from 'react-router-dom';


const Recipe = () => {
  const { state } = useLocation();
  const { recipeData } = state || {};

  if (!recipeData) {
    return <p className="recipe-fallback">No recipe data available.</p>;
  }

  const { title, image, ingredients, instructions, createdBy } = recipeData;

  return (
    <div className="recipe-container fade-slide">
      <img
        src={image}
        alt={title}
        className="recipe-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXugt2H8i2OckR_BXk_ae45w1eMyoZLd6mGQ&s';
        }}
      />
      <div className="recipe-content">
        <h2 className="recipe-title">{title}</h2>

        <div>
          <h3 className="recipe-section">🍴 Ingredients</h3>
          <ul className="recipe-list">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="recipe-section">📖 Instructions</h3>
          <p className="recipe-text">{instructions}</p>
        </div>

        <p className="recipe-author">👨‍🍳 Created by: {createdBy}</p>
      </div>
    </div>
  );
};

export default Recipe;
