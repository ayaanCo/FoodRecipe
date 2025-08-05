import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import Carousel from "./Carousels";

const Home = () => {
  const navigate = useNavigate();
  const [Recipes, setRecipes] = useState([]);

  const handleFetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:5000/recipes");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

 const img = [];

Recipes.forEach((val) => {
  img.unshift({ id: val._id, img: val.image }); // add to front (latest first)

  if (img.length > 5) {
    img.pop(); // remove last if more than 5
  }
});
  if (img.length == 0)
    img.push({
      id: 1001,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBCQtioqZytbeIZ0wn2aXf4xEYsYc26C-Odg&s",
    });
  useEffect(() => {
    handleFetchRecipes();
  }, []);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const capitalizedName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "Guest";

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero fade-in">
        <div className="hero-content">
          <h4>Welcome, {capitalizedName}</h4>
          <h1>
            🍽️ Discover Delicious Recipes & <br /> Share Your's
          </h1>
          <p>Explore simple, healthy, and tasty dishes to cook at home.</p>
          <button className="cta" onClick={() => navigate("/addrecipe")}>
            Add Recipes
          </button>
        </div>
        <div className="hero-image">
          <Carousel images={img} />
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="featured-section fade-up">
        <h2> Featured Recipes</h2>
        <div className="recipe-grid">
          {Recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              setRecipes={setRecipes}
              recipe={recipe}
              showBtn={false}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
