import React, { useContext, useEffect, useState } from 'react';
import { FaClock, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import capitalize from 'lodash/capitalize'
import { update } from 'lodash';
import { Context } from './Context';
export default function RecipeCard({ recipe, setRecipes, showBtn, onUnlike }) {
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(recipe.likes?.length || 0);
  const [liked, setLiked] = useState(false);
  const {isSearchOpen,setIsSearchOpen}=useContext(Context)
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  useEffect(() => {
    if (recipe.likes?.includes(userId)) {
      setLiked(true);
    }
  }, [recipe.likes, userId]);

  const handleCardClick = async (recipeId) => {
    try {
      const res = await fetch(`http://localhost:5000/recipes/${recipeId}`);
      if (!res.ok) throw new Error('Failed to fetch recipe details');
      const recipeData = await res.json();
      navigate('/recipe', { state: { recipeData } });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleUpdateRecipe = (recipe, e) => {
    e.stopPropagation();
    navigate(`/recipe/update`, { state: { recipe } });
  };

  const handleDeleteRecipe = async (recipeId, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    try {
      const res = await fetch(`http://localhost:5000/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to delete recipe');
      toast.success('Recipe deleted successfully');
      setRecipes(prev => prev.filter(r => r._id !== recipeId));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const toggleLike = async (e) => {
    e.stopPropagation();
    if (!userId) return toast("Please login to like recipes");

    try {
      const res = await fetch('http://localhost:5000/recipes/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId: recipe._id }),
      });

      const data = await res.json();

      setLiked(data.liked);
      setLikeCount(data.likeCount);
      if (!data.liked && typeof onUnlike === 'function') {
        onUnlike();
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
   <div className="recipe-card" onClick={() =>{ handleCardClick(recipe._id),setIsSearchOpen(false)}}>
  {showBtn && (
    <div className="recipe-actions">
      <button
        onClick={(e) => handleUpdateRecipe(recipe, e)}
        className="btn btn-edit"
        aria-label="Edit Recipe"
      >
        <MdEdit size={18} color="white" />
      </button>
      <button
        onClick={(e) => handleDeleteRecipe(recipe._id, e)}
        className="btn btn-edit"
        aria-label="Delete Recipe"
      >
        <MdDeleteOutline size={18} color="white" />
      </button>
    </div>
  )}

  <img
    src={recipe.image}
    alt={recipe.title}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXugt2H8i2OckR_BXk_ae45w1eMyoZLd6mGQ&s';
    }}
  />

  <div className="recipe-info">
    <h3>{recipe.title}</h3>
    <div className="creator">Created By: {capitalize(recipe.createdBy)}</div>
    <div className="creator">On: {recipe.createdAt.slice(0, 10)}</div>
    <div className="time-like">
      <div className="time">
        <FaClock size={18} className="clock-icon" />
        <span>{recipe.duration}</span>
      </div>
      <div className="like-section">
        <FaHeart
          color={liked ? 'red' : 'gray'}
          size={20}
          onClick={(e) => {
            toggleLike(e);
          }}
          className="like-icon"
          aria-label="Like Recipe"
        />
        {likeCount > 0 && <span className="like-count">{likeCount}</span>}
      </div>
    </div>
  </div>
</div>

  );
}