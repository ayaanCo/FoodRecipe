import express from 'express';
import Product from '../Model/Recipe.js';
import { createRecipe, getRecipes, getRecipe, deleteRecipe, updateRecipe } from '../controllers/Recipe.js';
const router = express.Router();

router.get('/recipes',getRecipes );
router.post('/recipes', createRecipe);
router.get('/recipes/:id',getRecipe );  
router.delete('/recipes/:id',deleteRecipe )
router.put('/recipes/:id',updateRecipe );
router.post('/recipes/toggle', async (req, res) => {
  const { productId, userId } = req.body;

  
  try {
    const product = await Product.findById(productId);
    const alreadyLiked = product.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      product.likes.pull(userId);
    } else {
      // Like
      product.likes.push(userId);
    }

    await product.save();

    res.json({
      liked: !alreadyLiked,
      likeCount: product.likes.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/search', async (req, res) => {
  const query = req.query.q; // get 'q' from ?q=something
  try {
    const results = await Product.find({
      title: { $regex: query, $options: 'i' } // case-insensitive search
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});
export default router;