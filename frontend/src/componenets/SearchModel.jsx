import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';

const SearchModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
const [Input, setInput] = useState('')
const [Recipes, setRecipes] = useState([]);
  const handleFetchRecipes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/search?q=${Input}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };
  useEffect(()=>{
    handleFetchRecipes();
  },[Input])
  return (
    <div className="search-modal-overlay" onClick={onClose}>
  <div className="search-modal" onClick={(e) => e.stopPropagation()}>
    <div className="modal-header">
      <button className="close-button" onClick={onClose}>✕</button>
    </div>

    {/* Sticky Header */}
    <div className="search-header">
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={Input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="search-icon">🔍</button>
    </div>

    {/* Conditional message */}
    {Recipes.length === 0 ? (
      <h2 style={{
        textAlign: 'center',
        marginTop: '200px',
        fontSize: 'clamp(1.5rem, 2vw + 1rem, 3rem)'
      }}>
        Recipe not found
      </h2>
    ) : null}

    {/* Scrollable content */}
    <div className="recipe-grid-search">
      {Recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          setRecipes={setRecipes}
          recipe={recipe}
          showBtn={false}
        />
      ))}
    </div>
  </div>
</div>

  );
};

export default SearchModal;
