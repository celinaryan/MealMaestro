// components/RecipeCard.tsx
import React from 'react';

interface Recipe {
  recipe_name: string;
  cooking_time: string;
  serving_portions: string;
  ingredients: string[];
  directions: string;
}

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>{recipe.recipe_name}</h3>
      <p><strong>Cooking Time:</strong> {recipe.cooking_time}</p>
      <p><strong>Servings:</strong> {recipe.serving_portions}</p>
    </div>
  );
}

export default RecipeCard;
