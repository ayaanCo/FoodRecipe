import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Carousel = ({ images, interval = 3000 }) => {
 
  const [current, setCurrent] = useState(0);
  const length = images.length;
   const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % length);
    }, interval);

    return () => clearInterval(timer);
  }, [length, interval]);
   
  
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

  return (
    <div className="carousel-container">
      {images.map((img, index) => (
        <div
          className={`carousel-slide ${index === current ? 'active' : ''}`}
          key={index}
        >
            
          <img src={img.img} alt={`Slide ${index}`} onClick={()=>{ img.id !=1001  ? handleCardClick(img.id) : null}}/>
        </div>
      ))}
      
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
