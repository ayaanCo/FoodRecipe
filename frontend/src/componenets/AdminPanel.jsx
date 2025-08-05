import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function AdminPanel() {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      alert("Access Denied: Admins only.");
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipeRes, userRes] = await Promise.all([
          fetch('http://localhost:5000/recipes'),
          fetch('http://localhost:5000/user'),
        ]);

        const recipeData = await recipeRes.json();
        const userData = await userRes.json();

        setRecipes(recipeData);
        setUsers(userData.user);
      } catch (err) {
        console.error("Error fetching data:", err);
        alert("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteRecipe = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/recipes/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setRecipes(prev => prev.filter(r => r._id !== id));
        toast.success("Recipe deleted successfully.");
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete the recipe.");
    }
  };

  const getUserNameById = (id) => {
    const found = users.find(user => user._id === id);
    return found ? found.name : 'Unknown';
  };

  return (
    <div className="admin-container fade-in">
      <h1 className="admin-heading">Admin Dashboard</h1>

      <div className="admin-cards">
        <StatsCard title="Total Recipes" value={recipes.length} />
        <StatsCard title="Total Users" value={users.length} />
      </div>

      <div className="admin-table-section">
        <h2 className="admin-subheading">Recipe Management</h2>
        {loading ? (
          <p className="admin-loading">Loading data...</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Created By</th>
                  <th>Likes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipes.length > 0 ? (
                  recipes.map(recipe => (
                    <tr key={recipe._id} className="table-row-fade">
                      <td>{recipe.title}</td>
                      <td>{recipe.createdBy}</td>
                      <td>{recipe.likes?.length || 0}</td>
                      <td>
                        <button onClick={() => handleDeleteRecipe(recipe._id)} className="admin-delete-btn">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="admin-empty">No recipes found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatsCard({ title, value }) {
  return (
    <div className="admin-card zoom-in">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}