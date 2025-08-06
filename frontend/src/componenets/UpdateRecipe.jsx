import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function UpdateRecipe() {
    const location = useLocation();
    const { recipe } = location.state || {}; // Get recipeId from state if available
    
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: recipe ? recipe.title : '',
    ingredients: recipe ? recipe.ingredients.join(', ') : '',
    instructions:  recipe ? recipe.instructions : '',
    image: recipe ? recipe.image : '',
    createdBy: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name.toLowerCase() : null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
   const handleSubmit = async (e) => {
    
      e.preventDefault();
       const recipeData = {
      ...formData,
      ingredients: formData.ingredients.split(',').map(i => i.trim()),
    };
      try {
  const response = await fetch(`https://foodrecipe-rug5.onrender.com/recipes/${recipe._id}`, {
    method: 'PUT', // 👈 Use PUT instead of POST
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipeData) // 👈 updated data
  });

  if (response.ok) {
   toast.success('Recipe updated successfully!');
    navigate('/myrecipe'); // redirect after success
  } else {
    toast.error('Failed to update recipe');
  }
} catch (error) {
  console.error('Error:', error);
  toast.error('Something went wrong while updating the recipe');
}

    }
  return (
     <div className="recipe-form-wrapper" style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>🍽️ Update Recipe</h2>

        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={formData.ingredients}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <textarea
          name="instructions"
          placeholder="Cooking Instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
          style={styles.textarea}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>➕ Add Recipe</button>
      </form>
    </div>
  )

}
const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #1a1a1a, #2a2a2a)', // Dark gradient background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  form: {
    width: '100%',
    maxWidth: '500px',
    background: '#2b2b2b', // Darker form background
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.4)', // Darker, more pronounced shadow
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    transition: 'transform 0.3s',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#f0f0f0', // Light text for heading
    fontWeight: 'bold',
    fontSize: '24px',
  },
  input: {
    padding: '0.8rem',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #555', // Darker border
    outline: 'none',
    backgroundColor: '#3a3a3a', // Darker input background
    color: '#e0e0e0', // Light text for input
    transition: 'border-color 0.3s',
  },
  textarea: {
    padding: '0.8rem',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #555', // Darker border
    height: '120px',
    resize: 'vertical',
    outline: 'none',
    backgroundColor: '#3a3a3a', // Darker textarea background
    color: '#e0e0e0', // Light text for textarea
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '0.9rem',
    fontSize: '16px',
    background: 'linear-gradient(to right, #007bff, #0056b3)', // Adjusted blue gradient for dark theme
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(0, 86, 179, 0.4)', // Darker shadow for button
    transition: 'transform 0.2s ease',
  }
};
