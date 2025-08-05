import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AddRecipe.css';

import { FaImage, FaUtensils, FaListUl, FaPen ,FaRegClock} from 'react-icons/fa';

const AddRecipe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    duration:'',
    image: '',
    createdBy: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).name.toLowerCase()
      : null,
      
  });
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'image') {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = {
      ...formData,
      ingredients: formData.ingredients.split(',').map(i => i.trim())
    };

    try {
      const response = await fetch('http://localhost:5000/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
      });

      if (response.ok) {
        setFormData({ title: '', ingredients: '', instructions: '', image: '', createdBy: '' });
        setImagePreview('');
        toast.success('🎉 Recipe added successfully!');
        navigate('/');
      } else {
        toast.error('Failed to add recipe');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };

  return (
   <div className="add-recipe-bg">
  <form className="add-recipe-form animate" onSubmit={handleSubmit}>
    <h2>🍽️ Add a New Recipe</h2>

    <div className="input-icon">
      <FaUtensils />
      <input
        type="text"
        name="title"
        placeholder="Recipe Title"
        value={formData.title || ""}
        onChange={handleChange}
        required
      />
    </div>

    <div className="input-icon">
      <FaListUl />
      <input
        type="text"
        name="ingredients"
        placeholder="Ingredients (comma separated)"
        value={formData.ingredients || ""}
        onChange={handleChange}
        required
      />
    </div>

    <div className="input-icon">
      <FaPen />
      <textarea
        name="instructions"
        placeholder="Cooking Instructions"
        value={formData.instructions || "" }
        onChange={handleChange}
        required
      />
    </div>

    {/* ⏱️ Duration field added below */}
    <div className="input-icon">
      <FaRegClock />
      <input
        type="text"
        name="duration"
        placeholder="Duration (e.g., 30 mins)"
        value={formData.duration || "" }
        onChange={handleChange}
        required
      />
    </div>

    <div className="input-icon">
      <FaImage />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image || ""}
        onChange={handleChange}
        required
      />
    </div>

    {imagePreview && (
      <img src={imagePreview} alt="Preview" className="image-preview" />
    )}

    <button type="submit">➕ Add Recipe</button>
  </form>
</div>

  );
};

export default AddRecipe;
